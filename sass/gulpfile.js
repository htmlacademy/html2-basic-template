import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from 'gulp-postcss';
import postUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import { stacksvg } from "gulp-stacksvg";
import {deleteAsync} from 'del';
import browser from 'browser-sync';
import bemlinter from 'gulp-html-bemlinter';
import { htmlValidator } from "gulp-w3c-html-validator";

const sass = gulpSass(dartSass);

// Styles

export function styles () {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      postUrl({ assetsPath: '../' }),
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}


// HTML

export function html () {
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

export function scripts () {
  return gulp.src('source/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

// Images

export function optimizeImages () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

export function copyImages () {
  return gulp.src('source/img/**/*.{png,jpg}')
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

export function svg () {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/**/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

export function stack () {
  return gulp.src('source/img/icons/**/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(gulp.dest('build/img/icons'));
}

// Copy

export function copy () {
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

export function clean () {
  return deleteAsync('build');
}

// Server

export function server (done) {
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

function reload (done) {
  browser.reload();
  done();
}

// Watcher

function watcher () {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build

export function build (done) {
  gulp.series(
    clean,
    copy,
    optimizeImages,
    gulp.parallel(
      styles,
      html,
      scripts,
      svg,
      stack,
      createWebp
    ),
  );
  done();
}

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    stack,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
