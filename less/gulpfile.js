import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import postUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import { stacksvg } from "gulp-stacksvg";
import { deleteAsync } from 'del';
import browser from 'browser-sync';
import bemlinter from 'gulp-html-bemlinter';
import { htmlValidator } from "gulp-w3c-html-validator";

let isDevelopment = true;

// Styles

export function processStyles () {
  return gulp.src('source/less/*.less', { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      postUrl({ assetsPath: '../' }),
      autoprefixer(),
      csso()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}


// HTML

export function processMarkup () {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'));
}

export function lintBem () {
  return gulp.src('source/*.html')
    .pipe(bemlinter());
}

export function validateMarkup () {
  return gulp.src('source/*.html')
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter({ throwErrors: true }));
}

// Scripts

export function processScripts () {
  return gulp.src('source/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

// Images

export function optimizeImages () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulpIf(!isDevelopment, squoosh()))
    .pipe(gulp.dest('build/img'))
}

// WebP

export function createWebp () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

// SVG

export function optimizeVector () {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/**/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

export function createStack () {
  return gulp.src('source/img/icons/**/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(gulp.dest('build/img/icons'));
}

// Copy

export function copyAssets () {
  return gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}


// Clean

export function deleteBuild () {
  return deleteAsync('build');
};

// Server

export function startServer (done) {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

export function reloadServer (done) {
  browser.reload();
  done();
}

// Watcher

function watchFiles () {
  gulp.watch('source/less/**/*.less', gulp.series(processStyles));
  gulp.watch('source/js/script.js', gulp.series(processScripts));
  gulp.watch('source/*.html', gulp.series(processMarkup, reloadServer));
}

// Build

export function buildProd (done) {
  isDevelopment = false;
  gulp.series(
    deleteBuild,
    copyAssets,
    optimizeImages,
    gulp.parallel(
      processStyles,
      processMarkup,
      processScripts,
      optimizeVector,
      createStack,
      createWebp
    ),
  );
  done();
}

// Default

export function runDev (done) {
  gulp.series(
    deleteBuild,
    copyAssets,
    optimizeImages,
    gulp.parallel(
      processStyles,
      processMarkup,
      processScripts,
      optimizeVector,
      createStack,
      createWebp
    ),
    gulp.series(
      startServer,
      watchFiles
    )
  );
  done();
}
