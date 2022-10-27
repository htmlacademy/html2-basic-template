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

const { src, dest, watch, series, parallel } = gulp;
let isDevelopment = true;

export function processMarkup () {
  return src('source/*.html')
    .pipe(dest('build'));
}

export function lintBem () {
  return src('source/*.html')
    .pipe(bemlinter());
}

export function validateMarkup () {
  return src('source/*.html')
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter({ throwErrors: true }));
}

export function processStyles () {
  return src('source/less/*.less', { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      postUrl({ assetsPath: '../' }),
      autoprefixer(),
      csso()
    ]))
    .pipe(dest('build/css', { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}

export function processScripts () {
  return src('source/js/**/*.js')
    .pipe(terser())
    .pipe(dest('build/js'))
    .pipe(browser.stream());
}

export function optimizeImages () {
  return src('source/img/**/*.{png,jpg}')
    .pipe(gulpIf(!isDevelopment, squoosh()))
    .pipe(dest('build/img'))
}

export function createWebp () {
  return src('source/img/**/*.{png,jpg}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(dest('build/img'))
}

export function optimizeVector () {
  return src(['source/img/**/*.svg', '!source/img/icons/**/*.svg'])
    .pipe(svgo())
    .pipe(dest('build/img'));
}

export function createStack () {
  return src('source/img/icons/**/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(dest('build/img/icons'));
}

export function copyAssets () {
  return src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
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
  watch('source/less/**/*.less', series(processStyles));
  watch('source/js/script.js', series(processScripts));
  watch('source/*.html', series(processMarkup, reloadServer));
}

function compileProject (done) {
  parallel(
    processMarkup,
    processStyles,
    processScripts,
    optimizeVector,
    createStack,
    copyAssets,
    optimizeImages,
    createWebp
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
