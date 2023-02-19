# W3C HTML Validator
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_Check the markup validity of HTML files using the W3C validator_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/w3c-html-validator/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/w3c-html-validator.svg)](https://www.npmjs.com/package/w3c-html-validator)
[![Vulnerabilities](https://snyk.io/test/github/center-key/w3c-html-validator/badge.svg)](https://snyk.io/test/github/center-key/w3c-html-validator)
[![Build](https://github.com/center-key/w3c-html-validator/workflows/build/badge.svg)](https://github.com/center-key/w3c-html-validator/actions/workflows/run-spec-on-push.yaml)

## A) Setup

### Install
Install package for node:
```shell
$ npm install --save-dev w3c-html-validator
```

### Import
Import into your application:
```javascript
import { w3cHtmlValidator } from 'w3c-html-validator';
```
or invoke directly [from the command line or from a **package.json** script](#6-command-line).

## B) Usage
Call the `validate()` function:
```javascript
const options = { filename: 'docs/index.html' };
w3cHtmlValidator.validate(options).then(console.log);
```
To display formatted output, replace `console.log` with `w3cHtmlValidator.reporter`:
```javascript
w3cHtmlValidator.validate(options).then(w3cHtmlValidator.reporter);
```
To see some example validation results, run the commands:
```shell
$ cd w3c-html-validator
$ node examples.js
```
<img src=https://raw.githubusercontent.com/center-key/w3c-html-validator/main/examples.png
width=800 alt=screenshot>

## C) Options
### w3cHtmlValidator.validate(options)
| Name (key)       | Type                    | Default                          | Description                                                          |
| :--------------- | :---------------------- | :------------------------------- | :------------------------------------------------------------------- |
| `html`           | **string**              | `null`                           | HTML string to validate.                                             |
| `filename`       | **string**              | `null`                           | HTML file to validate.                                               |
| `website`        | **string**              | `null`                           | URL of website to validate.                                          |
| `checkUrl`       | **string**              | `'https://validator.w3.org/nu/'` | W3C validation API endpoint.                                         |
| `ignoreLevel`    | `'info'` or `'warning'` | `null`                           | Skip unwanted messages.*                                             |
| `ignoreMessages` | **string** or **regex** | `null`                           | Skip messages containing a string or matching a regular expression.* |
| `output`         | `'json'` or `'html'`    | `'json'`                         | Get results as an array or as a web page.                            |

*The `ignoreMessages` and `ignoreLevel` options only work for `'json'` output.&nbsp;
Option value `'warning'` also skips `'info'`.

### w3cHtmlValidator.reporter(options)
| Name (key)      | Type        | Default | Description                                                    |
| :-------------- | :---------- | :------ | :------------------------------------------------------------- |
| `maxMessageLen` | **number**  | `null`  | Trim validation messages to not exceed a maximum length.       |
| `quiet`         | **boolean** | `false` | Suppress messages for successful validations.                  |
| `title`         | **string**  | `null`  | Override display title (useful for naming HTML string inputs). |

## D) TypeScript Declarations
The **TypeScript Declaration File** file is [w3c-html-validator.d.ts](dist/w3c-html-validator.d.ts)
in the **dist** folder.

The output of the `w3cHtmlValidator.validate(options: ValidatorOptions)` function is a **promise**
for `ValidatorResults` object:
```typescript
type ValidatorResults = {
   validates: boolean,
   mode:      'html' | 'filename' | 'website';
   html:      string | null,
   filename:  string | null,
   website:   string | null,
   output:    'json' | 'html',
   status:    number,
   messages:  ValidatorResultsMessage[] | null,  //for 'json' output
   display:   string | null,                     //for 'html' output
   };
```

## E) Mocha Example
```javascript
import assert from 'assert';
import { w3cHtmlValidator } from 'w3c-html-validator';

describe('Home page', () => {
   it('validates', (done) => {
      const handleResults = (results) => {
         assert(results.status === 200, 'Request succeeded');
         assert(results.validates, 'Home page validates');
         done();
         };
      const options = { filename: 'docs/index.html' };
      w3cHtmlValidator.validate(options).then(handleResults);
      });
   });
```

## F) Command Line
You can install **w3c-html-validator** globally and then run it anywhere directly from the terminal.

Example terminal commands:
```shell
$ npm install --global w3c-html-validator
$ html-validator       #validate all html files in project
$ html-validator docs  #validate html files in a folder
$ html-validator docs/*.html flyer.html
$ html-validator docs --quiet    #suppress "pass" messages
$ html-validator docs --trim=30  #truncate messages to 30 characters
```
or as an npm script in **package.json**:
```json
   "scripts": {
      "validate":   "html-validator docs/*.html flyer.html",
      "one-folder": "html-validator docs",
      "all":        "html-validator --quiet"
   },
```
Passing no parameters defaults to validating all HTML files in the project (skipping the
**node_modules** folder).

<br>

---
**Build Tools**
   - 🎋 [add-dist-header](https://github.com/center-key/add-dist-header):&nbsp; _Prepend a one-line header comment (with license notice) to distribution files_
   - 📄 [copy-file-util](https://github.com/center-key/copy-file-util):&nbsp; _Copy or rename a file (CLI tool designed for use in npm scripts)_
   - 📂 [copy-folder-cli](https://github.com/center-key/copy-folder-cli):&nbsp; _Recursively copy a folder (CLI tool designed for use in npm scripts)_
   - 🚦 [w3c-html-validator](https://github.com/center-key/w3c-html-validator):&nbsp; _Check the markup validity of HTML files using the W3C validator_

Feel free to submit questions at:<br>
[github.com/center-key/w3c-html-validator/issues](https://github.com/center-key/w3c-html-validator/issues)

[MIT License](LICENSE.txt)
