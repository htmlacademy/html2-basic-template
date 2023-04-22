import gulp from "gulp";
import sharpResponsive from "gulp-sharp-responsive";
import cache from "gulp-cache";

const RE_SIZERS = [(image) => image.width, (image) => Math.ceil((image.width * 2) / 3), (image) => Math.ceil(image.width / 3)];
const RE_NAMERS = [{ suffix: "@3x" }, { suffix: "@2x" }];
const OPTIONS = createOptionsFormat();

function optimizeImages() {
	return gulp
		.src('source/img/**/*.{png,jpg}')
		.pipe(cache(sharpResponsive(OPTIONS)))
		.pipe(gulp.dest('build/img'));
}

function createOptionsFormat() {
	const formats = [];

	for (const format of [undefined, "avif", "webp"]) {
		formats.push(
			{
				width: RE_SIZERS[0],
				rename: RE_NAMERS[0],
				format,
			},
			{
				width: RE_SIZERS[1],
				rename: RE_NAMERS[1],
				format,
			},
			{ width: RE_SIZERS[2], format }
		);
	}

	return {formats};
}

export { optimizeImages };
