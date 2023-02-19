#!/usr/bin/env node
////////////////////////
// w3c-html-validator //
// MIT License        //
////////////////////////

// Usage in package.json:
//    "scripts": {
//       "validate": "html-validator docs/*.html flyer.html",
//       "all":      "html-validator"
//    },
//
// Usage from command line:
//    $ npm install --global w3c-html-validator
//    $ html-validator docs/*.html flyer.html
//    $ html-validator  #validate all html files in the project
//
// Contributors to this project:
//    $ cd w3c-html-validator
//    $ node bin/cli.js spec/**/*.html --quiet

// Imports
import { w3cHtmlValidator } from '../dist/w3c-html-validator.js';
import { lstatSync }        from 'fs';
import chalk                from 'chalk';
import glob                 from 'glob';
import log                  from 'fancy-log';

// Parameters
const validFlags =  ['quiet', 'trim'];
const args =        process.argv.slice(2);
const flags =       args.filter(arg => /^--/.test(arg));
const flagMap =     Object.fromEntries(flags.map(flag => flag.replace(/^--/, '').split('=')));
const invalidFlag = Object.keys(flagMap).find(key => !validFlags.includes(key));
const params =      args.filter(arg => !/^--/.test(arg));

// Data
const files = params;
const mode =  { quiet: 'quiet' in flagMap, trim: 'trim' in flagMap };
const trim =  parseInt(flagMap.trim) || null;

// Validator
const keep =         (filename) => !filename.includes('node_modules/');
const readFolder =   (folder) => glob.sync(folder + '**/*.html', { ignore: '**/node_modules/**/*' });
const expandFolder = (file) => lstatSync(file).isDirectory() ? readFolder(file + '/') : file;
const getFilenames = () => [...new Set(files.map(expandFolder).flat().filter(keep))].sort();
const filenames =    files.length ? getFilenames() : readFolder('');
const error =
   invalidFlag ?        'Invalid flag: ' + invalidFlag :
   !filenames.length ?  'No files to validate.' :
   mode.trim && !trim ? 'Value of "trim" must be a positive whole number.' :
   null;
if (error)
   throw Error('[w3c-html-validator] ' + error);
if (filenames.length > 1 && !mode.quiet)
   log(chalk.gray('w3c-html-validator'), chalk.magenta('files: ' + filenames.length));
const reporterOptions = {
   quiet:         mode.quiet,
   maxMessageLen: trim,
   };
const handleReport = (report) => w3cHtmlValidator.reporter(report, reporterOptions);
filenames.forEach(file => w3cHtmlValidator.validate({ filename: file }).then(handleReport));
