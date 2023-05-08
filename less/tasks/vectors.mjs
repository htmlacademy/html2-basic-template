import gulp from "gulp";
import svgo from "gulp-svgmin";
import { stacksvg } from "gulp-stacksvg";

const DEST = "build/img";
const IMAGE_PATH = ["source/svg/**/*.svg", "!source/svg/icons/**/*.svg"];
const STACK_PATH = "source/svg/icons/**/*.svg";

const optimizeVector = () =>
  gulp.src(IMAGE_PATH).pipe(svgo()).pipe(gulp.dest(DEST));

const createStack = () =>
  gulp.src(STACK_PATH).pipe(svgo()).pipe(stacksvg()).pipe(gulp.dest(DEST));

const watchSVG = () => {
  gulp.watch(IMAGE_PATH, optimizeVector);
  gulp.watch(STACK_PATH, createStack);
};

export { optimizeVector, createStack, watchSVG };
