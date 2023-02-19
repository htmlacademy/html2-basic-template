# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.2] — 2022–09–22

### Updated

- Dependencies.

### Improoved

- Replaced gulp keyword with gulpplugin.

## [2.1.1] — 2022–08–14

### Fixed

- A bug that was present since v2.0.0 and dropped all BEM linting.

## [2.1.0] — 2022–08–14

### Changed

- If you have a precommit configured, now it will also be triggered on errors according to the BEM methodology.

### Fixed

- The license badge color stands out less from the list of other badges.

## [2.0.3] — 2022–08–14

### Added

- For more automated project publishing, `preversion` and `postversion` scripts have been added to package.json.

### Changed

- The `classic-ancii-tree` code has been moved to an internal module. Thanks to this, we managed to get rid of the last vulnerability in dependencies 🎉

### Fixed

- The versions in this changelog are now links to comparisons with previous versions.

## [2.0.2] — 2022–08–13

### Changed

- Result styling.
- Messages of the tests.
- Examples screenshot in [README.md](README.md)


## [2.0.1] — 2022–08–13

### Added

- GitHub action for linting and testing project during pull requests.
- Badge for tests.
- Badge for license.
- Badge for vulnerability counter.

## [2.0.0] — 2022–08–12

### Added

- Eslint.

### Changed

- All project dependencies have been updated to the latest versions.
- To upgrade Chalk to v5+, the project was transferred from cjs to esm.

### Fixed

- JS files fixed to match eslint settings.

## [1.2.3] — 2022–07–27

### Added

- Editorconfig.

### Changed

- Improved formatting project files.
- The project name has been updated in all files.
- Updated report styling.

### Removed

- One optional dependency.

## [1.2.0] — 2022–07–26

### Fixed

- `page` block elements on the `html` tag are no longer treated as “element outside of its block” errors.

## [1.1.0] — 2022–07–26

### Fixed

- The elements of the elements, such as `block__elem1__elem2`, are now also flagged as a bem naming error (thanks to [@SampetovaN](https://github.com/SampetovaN)).

## [1.0.0] — 2022–07–26

### Added

- Basic functionality via a fork of the [gulp-html-bem-validator](https://github.com/dDenysS/gulp-html-bem-validator/) project.

[unreleased]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.1.1...HEAD
[2.1.1]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.0.3...v2.1.0
[2.0.3]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v1.2.3...v2.0.0
[1.2.3]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v1.2.0...v1.2.3
[1.2.0]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v1.0.0...v1.1.0
[1.0.1]: https://github.com/firefoxic/gulp-html-bemlinter/releases/tag/v1.0.0
