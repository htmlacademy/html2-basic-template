editorconfig-cli
================

Simple command line interface (CLI) for [.editorconfig](http://editorconfig.org) based on the node-lintspaces module. 
Uses `.editorconfig` by default from current directory. To change default location use `-e` argument.
Supports [GLOB format](https://github.com/isaacs/node-glob).

## Install
```
$ npm install -g @htmlacademy/editorconfig-cli
```


## Help
```
zeckson@mac ~/d/editorconfig-cli (master)> editorconfig-cli --help                                                                                  19:20:07

  Usage: editorconfig-cli [options] <file ... or 'glob'>

  Options:

    -h, --help                              output usage information
    -e, --editorconfig <file>               pass .editorconfig (by default it will look in './.editorconfig')
    -i, --ignores <profile-name or regexp>  ignoring profiles. Like ('js-comments'|'java-comments'|'xml-comments'|'html-comments'|...). Defaults are 'js-comments'|'html-comments'
    -j, --json <file>                       load GLOBs from JSON file. If no input passed, then it tries to find array in package.json
    -x, --exclude <regexp>                  exclude files by pattern. Default 'normalize.*'
    -v, --verbose                           verbose output

```

## Example Commands

Check all JavaScript files recursively, using `./.editorconfig` as settings:

```
editorconfig-cli **/*.js
```

The same as above but with [GLOB format](https://github.com/isaacs/node-glob):

```
editorconfig-cli '**/*.js'
```

Load GLOBs from `package.json` and exclude `normalize.*` by default:
```
editorconfig-cli
```

Format of JSON with GLOBs:
```json
glob.json
{
  "editorconfig-cli": [
                          "./*.html",
                          "./*.json",
                          "./img/**/*.svg",
                          "./js/**/*.js",
                          "./less/**/*.less",
                          "./sass/**/*.{sass,scss}",
                          "./postcss/**/*.{css,pcss}"
                        ]
}
```

Pass `glob.json` to CLI:
```
editorconfig-cli -j glob.json
```

## Ignores
lintspaces supports [built-in ignores](https://github.com/schorfES/node-lintspaces#ignores-option).

Using built in ignores can be done like so:

```
editorconfig-cli -i 'js-comments' -i 'c-comments'
```

If parameters are omitted, then `js-comments` and `html-comments` are used. 
