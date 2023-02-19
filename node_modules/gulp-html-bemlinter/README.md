# gulp-html-bemlinter

[![Build status][test-image]][test-url]
[![License:ISC][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]

Gulp plugin for linting a bem html

## Usage

First, install `gulp-html-bemlinter` as a development dependency:

```bash
npm install --save-dev gulp-html-bemlinter
```

Then, add it to your `gulpfile.js`:

## Simple example

```js
import gulp from "gulp" 
import bemlinter from "gulp-html-bemlinter"

function lintBemMarkup () {
	return gulp.src("pages/**/*.html")
		.pipe(bemlinter())
}
```

## Examples of failed and successful linting output

![image](https://user-images.githubusercontent.com/3382798/184424150-2cedb63f-c77e-4a30-a958-6f9e245e346e.png)

[test-url]: https://github.com/firefoxic/gulp-html-bemlinter/actions
[test-image]: https://github.com/firefoxic/gulp-html-bemlinter/actions/workflows/test.yml/badge.svg?branch=main

[npm-url]: https://npmjs.org/package/gulp-html-bemlinter
[npm-image]: https://badge.fury.io/js/gulp-html-bemlinter.svg

[license-url]: https://github.com/firefoxic/gulp-html-bemlinter/blob/main/LICENSE
[license-image]: https://img.shields.io/badge/License-ISC-limegreen.svg

[vulnerabilities-url]: https://snyk.io/test/github/firefoxic/gulp-html-bemlinter
[vulnerabilities-image]: https://snyk.io/test/github/firefoxic/gulp-html-bemlinter/badge.svg
