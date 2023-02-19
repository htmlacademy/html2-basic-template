# gulp-stacksvg

[![Test Status][test-image]][test-url]
[![License: MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![Vulnerabilities count][vulnerabilities-image]][vulnerabilities-url]

Combine svg icon files into one with stack method.

## Installation

```shell
npm install gulp-stacksvg --save-dev
```

## Usage

The following script will combine all svg sources into single svg file with stack method.

```js
import { stacksvg } from "gulp-stacksvg"
import gulp from "gulp"

const { src, dest } = gulp

function makeStack () {
	return src(`./src/icons/**/*.svg`)
		.pipe(stacksvg({ output: `sprite` }))
		.pipe(dest(`./dest/icons`))
}
```

### Avalable options

| Option      | Description                                                                          | Default     |
|-------------|--------------------------------------------------------------------------------------|-------------|
| `output`    | Sets the stack file name. Accepts values ​both with and without the `.svg` extension. | `stack.svg` |
| `separator` | Replaces the directory separator for the `id` attribute.                             | `_`         |
| `spacer`    | Joins space-separated words for the `id` attribute.                                  | `-`         |

### Inlining stacksvg result into markup

You just don't have to want it.

## Why a stack?

Unlike all other methods for assembling a sprite, the stack does not limit us in choosing how to insert a vector into a page. Take a look at [the results](https://demos.frontend-design.ru/sprite/src/) of different ways to display fragments of different types of sprites.

We can use the stack in all four possible ways:

- in markup:
  - in `src` of `img` tag — static,
  - in the `href` of the `use` tag — with the possibility of repainting,
- in styles:
  - in `url()` properties `background` — static,
  - in `url()` properties `mask` — with the possibility of repainting.

[Demo page](https://firefoxic.github.io/gulp-stacksvg/test/) to prove it.

## Stack under the hood

This method was first mentioned in a Simurai [article](https://simurai.com/blog/2012/04/02/svg-stacks) on April 2, 2012. But even it uses unnecessarily complex code transformations.

This can be done much easier. In general, the stack is arranged almost like a symbol sprite, but without changing the icon tag (it remain the `svg` tag, as in the original icon files) and with the addition of a tiny bit of style.

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

	<style>:root svg:not(:target) { display: none }</style>
```

<img align="left" width="90" height="90" title="sun" src="https://raw.githubusercontent.com/firefoxic/gulp-stacksvg/main/test/stack.svg#sun-alpha">

```xml
<svg id="sun" viewBox="0 0 24 24">
	<!-- Inner code of sun icon -->
</svg>
```

<img align="left" width="90" height="90" title="heart" src="https://raw.githubusercontent.com/firefoxic/gulp-stacksvg/main/test/stack.svg#heart-red">

```xml
<svg id="heart" viewBox="0 0 24 24">
	<!-- Inner code of heart icon -->
</svg>
```

<img align="left" width="90" height="90" title="thumbup" src="https://raw.githubusercontent.com/firefoxic/gulp-stacksvg/main/test/stack.svg#thumbup-alpha">

```xml
<svg id="thumbup" viewBox="0 0 24 24">
	<!-- Inner code of thumbup icon -->
</svg>
```

```xml
</svg>
```

The magic is in the stack inner style, which shows only the fragment requested by the link, hiding everything else:

```css
:root svg:not(:target) { display: none }
```

It shows only the fragment that is requested by its link.

And now the icons from the external sprite are available in the styles <img width="16" height="16" title="heart" src="https://raw.githubusercontent.com/firefoxic/gulp-stacksvg/main/test/stack.svg#heart-red" alt="heart">

```html
<button class="button button--icon_heart" type="button">
	<span class="visually-hidden">Add to favorites</span>
</button>
```

```css
.button {
	display: inline-flex;
	align-items: center;
	gap: 0.5em;
}

.button--icon_heart {
	--icon: url("../icons/stack.svg#heart");
}

.button:hover {
	--fill: red;
}

.button::before {
	content: "";
	width: 1em;
	height: 1em;
	/* icon shape */
	mask: var(--icon) no-repeat center / contain;
	/* icon color */
	background: var(--fill, orangered);
}
```

> ⚠️ Note:  
> We still need the [autoprefixer](https://github.com/postcss/autoprefixer) for the mask property.

For an icon inserted via `mask`, simply change the `background`. Moreover, unlike `use`, you can draw anything in the background under the mask, for example, a gradient.

[test-url]: https://github.com/firefoxic/gulp-stacksvg/actions
[test-image]: https://github.com/firefoxic/gulp-stacksvg/actions/workflows/test.yml/badge.svg?branch=main

[npm-url]: https://npmjs.org/package/gulp-stacksvg
[npm-image]: https://badge.fury.io/js/gulp-stacksvg.svg

[license-url]: https://github.com/firefoxic/gulp-stacksvg/blob/main/LICENSE
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[vulnerabilities-url]: https://snyk.io/test/github/firefoxic/gulp-stacksvg
[vulnerabilities-image]: https://snyk.io/test/github/firefoxic/gulp-stacksvg/badge.svg
