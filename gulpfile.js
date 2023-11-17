import gulp from 'gulp';
import plumber from 'gulp-plumber';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import terser from 'gulp-terser';
import sharp from 'gulp-sharp-responsive';
import svgo from 'gulp-svgmin';
import { stacksvg } from 'gulp-stacksvg';
import { deleteAsync } from 'del';
import browser from 'browser-sync';
import bemlinter from 'gulp-html-bemlinter';

const { src, dest, watch, series, parallel } = gulp;
const sass = gulpSass(dartSass);
let isDevelopment = true;

export function processMarkup () {
  return src('source/*.html')
    .pipe(dest('build'));
}

export function lintBem () {
  return src('source/*.html')
    .pipe(bemlinter());
}

export function processStyles () {
  return src('source/styles/*.scss', { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      postUrl({ assetsPath: '../' }),
      autoprefixer(),
      csso()
    ]))
    .pipe(dest('build/styles', { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}

export function processScripts () {
  return src('source/scripts/**/*.js')
    .pipe(terser())
    .pipe(dest('build/scripts'))
    .pipe(browser.stream());
}

export function optimizeRaster () {
  const RAW_DENSITY = 2;
  const TARGET_FORMATS = [undefined, 'webp']; // undefined — initial format: jpg or png

  function createOptionsFormat() {
    const formats = [];

    for (const format of TARGET_FORMATS) {
      for (let density = RAW_DENSITY; density > 0; density--) {
        formats.push(
          {
            format,
            rename: { suffix: `@${density}x` },
            width: ({ width }) => Math.ceil(width * density / RAW_DENSITY),
            jpegOptions: { progressive: true },
          },
        );
      }
    }

    return { formats };
  }

  return src('raw/images/**/*.{png,jpg,jpeg}')
    .pipe(sharp(createOptionsFormat()))
    .pipe(dest('source/images'));
}

export function optimizeVector () {
  return src(['raw/**/*.svg'])
    .pipe(svgo())
    .pipe(dest('source'));
}

export function optimizeImages (done) {
  parallel(
    optimizeVector,
    optimizeRaster
  )(done);
}

export function createStack () {
  return src('source/icons/**/*.svg')
    .pipe(stacksvg())
    .pipe(dest('build/icons'));
}

export function copyAssets () {
  return src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
    'source/vendor/**/*',
    'source/images/**/*',
    '!source/**/README.md',
  ], {
    base: 'source'
  })
    .pipe(dest('build'));
}

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

function reloadServer (done) {
  browser.reload();
  done();
}

function watchFiles () {
  watch('source/styles/**/*.scss', series(processStyles));
  watch('source/scripts/**/*.js', series(processScripts));
  watch('source/*.html', series(processMarkup, reloadServer));
}

function compileProject (done) {
  parallel(
    processMarkup,
    processStyles,
    processScripts,
    createStack,
    copyAssets,
  )(done);
}

function deleteBuild () {
  return deleteAsync('build');
}

export function buildProd (done) {
  isDevelopment = false;
  series(
    deleteBuild,
    compileProject
  )(done);
}

export function runDev (done) {
  series(
    deleteBuild,
    compileProject,
    startServer,
    watchFiles
  )(done);
}
