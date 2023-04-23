import gulp from "gulp";
import sharpResponsive from "gulp-sharp-responsive";
import cache from "gulp-cache";

/**
 * @typedef {({width: number}) => number} ResizeFn
 * @type {ResizeFn[]} **/
const RE_SIZERS = [({ width }) => width, ({ width }) => Math.ceil(width / 2)];
const RENAME_OPTIONS = { suffix: "@2x" };
const OPTIONS = createOptionsFormat();

function createOptionsFormat() {
  const formats = [];

  for (const format of [undefined, "avif", "webp"]) {
    formats.push(
      {
        width: RE_SIZERS[0],
        rename: RENAME_OPTIONS,
        format,
      },
      { width: RE_SIZERS[1], format }
    );
  }

  return { formats };
}

export function optimizeImages() {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(cache(sharpResponsive(OPTIONS)))
    .pipe(gulp.dest("build/img"));
}
