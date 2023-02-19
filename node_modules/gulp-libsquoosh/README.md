# gulp-libsquoosh

Minify images with [libSquoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh), the [Squoosh](https://squoosh.app/) API for Node.

## Important Notice

From gulp-libsquoosh version 1.1.x, support for Node.js 12.x has been stopped because using libSquoosh 0.4.x with Node.js 12.x causes a wasm out-of-memory error.
If you want to use gulp-libsquoosh with node.js 12.x, you can use version 1.0.x. This version uses libSquoosh 0.3.x.

## Install

```
$ npm install --save-dev gulp-libsquoosh
```

## Usage

Detailed descriptions about options can be found in [libSquoosh README](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh).

### Basic

```js
const { src, dest, series } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// minify images into same format
function images() {
  return src('src/images/**')
    .pipe(squoosh())
    .pipe(dest('dist/images'));
}

exports.default = series(images);
```

### Convert to multiple image formats

```js
const { src, dest, series } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// minify png into png, webp and avif format
function images() {
  return src('src/images/**/*.png')
    .pipe(
      squoosh({
        oxipng: {},
        webp: {},
        avif: {},
      })
    )
    .pipe(dest('dist/images'));
}

exports.default = series(images);
```

### Conversion with watching files

It is useful to convert PNG files to multiple formats with `watch()` API.

```js
const { src, dest, watch } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// when png file dropped into images/** ...
function watchTask() {
  watch('images/**/*.png', images);
}

// ...minify png into png, webp and avif format
function images() {
  return src('images/**/*.png')
    .pipe(
      squoosh({
        oxipng: {},
        webp: {},
        avif: {},
      })
    )
    .pipe(dest('dist/images'));
}

exports.watch = watchTask;
```

You can specify each filename with `<source>` in `<picture>` tag.

```html
<picture>
  <source srcset="images/logo.avif" type="image/avif" />
  <source srcset="images/logo.webp" type="image/webp" />
  <img src="images/logo.png" width="800" height="400" alt="logo" />
</picture>
```

### Resizing image

```js
const { src, dest, series } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// resize image to width 200px with keeping aspect ratio.
function images() {
  return src('src/thumbnail/*.png')
    .pipe(
      squoosh(
        null, // use default
        {
          resize: {
            // specify either width or height
            // when you specify width and height, image resized to exact size you specified
            width: 200,
          },
        }
      )
    )
    .pipe(dest('dist/thumbnail'));
}

exports.default = series(images);
```

### Specify encodeOptions, preprocessOptions in one object argument.

```js
const { src, dest, series } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// squoosh({encodeOptions:..., preprocessOptions:...})
function images() {
  return src('src/images/**')
    .pipe(
      squoosh({
        encodeOptions: {
          avif: {},
          webp: {},
        },
        preprocessOptions: {
          rotate: {
            numRotations: 2,
          },
        },
      })
    )
    .pipe(dest('dist/images'));
}

exports.default = series(images);
```

### Resize using original image size

```js
const { src, dest, series } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// resize image to half size of original.
function images() {
  return src('src/thumbnail/*.png')
    .pipe(
      squoosh((src) => ({
        preprocessOptions: {
          resize: {
            width: Math.round(src.width / 2),
            height: Math.round(src.height / 2),
          },
        },
      }))
    )
    .pipe(dest('dist/thumbnail'));
}

exports.default = series(images);
```

You can use some helper functions. It acts like as "object-fit" CSS property.

- `contain(width, [height])`
- `scaleDown(width, [height])`

```js
const { src, dest, series } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// resize image to fit inside of 200x200 box.
function images() {
  return src('src/thumbnail/*.png')
    .pipe(
      squoosh((src) => ({
        preprocessOptions: {
          resize: {
            ...src.contain(200),
          },
        },
      }))
    )
    .pipe(dest('dist/thumbnail'));
}

exports.default = series(images);
```

### Quantize, Rotate image

```js
const { src, dest, series } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// quantize, rotate and minify png into png, webp and avif format
function images() {
  return src('src/images/**/*.png')
    .pipe(
      squoosh(
        {
          oxipng: {
            level: 6, // slower but more compression
          },
          webp: {},
          avif: {},
        },
        {
          // quantize images
          quant: {
            numColors: 128, // default=255
          },
          // rotate images
          rotate: {
            numRotations: 1, // (numRotations * 90) degrees
          },
        }
      )
    )
    .pipe(dest('dist/images'));
}

exports.default = series(images);
```

### More complex

```js
const path = require('path');
const { src, dest, series } = require('gulp');
const squoosh = require('gulp-libsquoosh');

function images() {
  return src(['src/images/**/*.{png,jpg,webp}'])
    .pipe(
      squoosh((src) => {
        const extname = path.extname(src.path);
        let options = {
          encodeOptions: squoosh.DefaultEncodeOptions[extname],
        };

        if (extname === '.jpg') {
          options = {
            encodeOptions: {
              jxl: {},
              mozjpeg: {},
            },
          };
        }

        if (extname === '.png') {
          options = {
            encodeOptions: {
              avif: {},
            },
            preprocessOptions: {
              quant: {
                enabled: true,
                numColors: 16,
              },
            },
          };
        }

        return options;
      })
    )
    .pipe(dest('dist/images'));
}

exports.default = series(images);
```

## API

### squoosh(encodeOptions?, preprocessOptions?)

Description of the options can be found in [libSquoosh README](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh#preprocessing-and-encoding-images).

## License

MIT License

Copyright (c) 2021-2022 Hideo Matsumoto
