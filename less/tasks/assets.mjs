import gulp from "gulp";

const ASSET_PATH = ["source/public/**/*", "!source/public/**/README.md"];
const copyAssets = () => gulp.src(ASSET_PATH).pipe(gulp.dest("build"));
const watchAssets = () => gulp.watch(ASSET_PATH, copyAssets);

export { copyAssets, watchAssets };
