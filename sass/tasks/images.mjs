import gulp from "gulp";
import sharpResponsive from "gulp-sharp-responsive";

const IMAGE_PATH = ".raw/**/*.{png,jpg}";
/** Значение `undefined` не меняет расширение входной картинки */
const TARGET_FORMATS = [undefined, "avif", "webp"]
/**
 * @typedef {(imageInfo: {width: number}) => number} ResizeFn функция для получение новой ширины картинки
 * @type {ResizeFn[]} **/
const RE_SIZERS = [({ width }) => width, ({ width }) => Math.ceil(width / 2)];
const RENAME_OPTIONS = { suffix: "@2x" };
const OPTIONS = createOptionsFormat();

function createOptionsFormat() {
  const formats = [];

  for (const format of TARGET_FORMATS) {
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

const optimizeImages = () =>
  gulp
    .src(IMAGE_PATH)
    .pipe(sharpResponsive(OPTIONS))
    .pipe(gulp.dest("source/public/img"));

const watchImages = () => gulp.watch(IMAGE_PATH, optimizeImages);
export { optimizeImages, watchImages };
