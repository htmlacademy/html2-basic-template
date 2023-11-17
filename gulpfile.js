import gulp from 'gulp';
import plumber from 'gulp-plumber';
import { nunjucksCompile } from 'gulp-nunjucks';
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
import server from 'browser-sync';
import bemlinter from 'gulp-html-bemlinter';

const { src, dest, watch, series, parallel } = gulp;
const sass = gulpSass(dartSass);
const PATH_TO_SOURCE = './source/';
const PATH_TO_DIST = './build/';
const PATH_TO_RAW = './raw/';
let isDevelopment = true;

export function processMarkup () {
  return src(`${PATH_TO_SOURCE}**/*.html`)
    .pipe(nunjucksCompile())
    .pipe(dest(PATH_TO_DIST))
    .pipe(server.stream());
}

export function lintBem () {
  return src(`${PATH_TO_SOURCE}*.html`)
    .pipe(bemlinter());
}

export function processStyles () {
  return src(`${PATH_TO_SOURCE}styles/*.scss`, { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      postUrl({ assetsPath: '../' }),
      autoprefixer(),
      csso()
    ]))
    .pipe(dest(`${PATH_TO_DIST}styles`, { sourcemaps: isDevelopment }))
    .pipe(server.stream());
}

export function processScripts () {
  return src(`${PATH_TO_SOURCE}scripts/**/*.js`)
    .pipe(terser())
    .pipe(dest(`${PATH_TO_DIST}scripts`))
    .pipe(server.stream());
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

  return src(`${PATH_TO_RAW}images/**/*.{png,jpg,jpeg}`)
    .pipe(sharp(createOptionsFormat()))
    .pipe(dest(`${PATH_TO_SOURCE}images`));
}

export function optimizeVector () {
  return src([`${PATH_TO_RAW}**/*.svg`])
    .pipe(svgo())
    .pipe(dest(PATH_TO_SOURCE));
}

export function optimizeImages (done) {
  parallel(
    optimizeVector,
    optimizeRaster
  )(done);
}

export function createStack () {
  return src(`${PATH_TO_SOURCE}images/icons/**/*.svg`)
    .pipe(stacksvg())
    .pipe(dest(`${PATH_TO_DIST}images/icons`));
}

export function copyAssets () {
  return src([
    `${PATH_TO_SOURCE}fonts/**/*.{woff2,woff}`,
    `${PATH_TO_SOURCE}*.ico`,
    `${PATH_TO_SOURCE}*.webmanifest`,
    `${PATH_TO_SOURCE}vendor/**/*`,
    `${PATH_TO_SOURCE}images/**/*`,
    `!${PATH_TO_SOURCE}images/icons/**/*`,
    `!${PATH_TO_SOURCE}**/README.md`,
  ], {
    base: PATH_TO_SOURCE
  })
    .pipe(dest(PATH_TO_DIST));
}

export function startServer (done) {
  server.init({
    server: {
      baseDir: PATH_TO_DIST
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function reloadServer (done) {
  server.reload();
  done();
}

function watchFiles () {
  watch(`${PATH_TO_SOURCE}styles/**/*.scss`, series(processStyles));
  watch(`${PATH_TO_SOURCE}scripts/**/*.js`, series(processScripts));
  watch(`${PATH_TO_SOURCE}**/*.html`, series(processMarkup, reloadServer));
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
  return deleteAsync(PATH_TO_DIST);
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
