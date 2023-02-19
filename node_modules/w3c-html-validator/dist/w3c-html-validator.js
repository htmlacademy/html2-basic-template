//! w3c-html-validator v1.1.3 ~~ https://github.com/center-key/w3c-html-validator ~~ MIT License

import { readFileSync } from 'fs';
import chalk from 'chalk';
import log from 'fancy-log';
import request from 'superagent';
const w3cHtmlValidator = {
    version: '1.1.3',
    validate(options) {
        var _a;
        const defaults = {
            checkUrl: 'https://validator.w3.org/nu/',
            ignoreLevel: null,
            ignoreMessages: null,
            output: 'json',
        };
        const settings = Object.assign(Object.assign({}, defaults), options);
        if (!settings.html && !settings.filename && !settings.website)
            throw Error('[w3c-html-validator] Must specify the "html", "filename", or "website" option.');
        if (![null, 'info', 'warning'].includes(settings.ignoreLevel))
            throw Error('[w3c-html-validator] Invalid ignoreLevel option: ' + settings.ignoreLevel);
        if (settings.output !== 'json' && settings.output !== 'html')
            throw Error('[w3c-html-validator] Option "output" must be "json" or "html".');
        const mode = settings.html ? 'html' : settings.filename ? 'filename' : 'website';
        const readFile = (filename) => readFileSync(filename, 'utf8').replace(/\r/g, '');
        const inputHtml = (_a = settings.html) !== null && _a !== void 0 ? _a : (settings.filename ? readFile(settings.filename) : null);
        const makePostRequest = () => request.post(settings.checkUrl)
            .set('Content-Type', 'text/html; encoding=utf-8')
            .send(inputHtml);
        const makeGetRequest = () => request.get(settings.checkUrl)
            .query({ doc: settings.website });
        const w3cRequest = inputHtml ? makePostRequest() : makeGetRequest();
        w3cRequest.set('User-Agent', 'W3C HTML Validator ~ github.com/center-key/w3c-html-validator');
        w3cRequest.query({ out: settings.output });
        const json = settings.output === 'json';
        const success = '<p class="success">';
        const titleLookup = {
            html: 'HTML String (characters: ' + (inputHtml === null || inputHtml === void 0 ? void 0 : inputHtml.length) + ')',
            filename: settings.filename,
            website: settings.website,
        };
        const filterMessages = (response) => {
            var _a, _b;
            const aboveInfo = (subType) => settings.ignoreLevel === 'info' && !!subType;
            const aboveIgnoreLevel = (message) => !settings.ignoreLevel || message.type !== 'info' || aboveInfo(message.subType);
            const skipSubstr = (title) => typeof settings.ignoreMessages === 'string' && title.includes(settings.ignoreMessages);
            const skipRegEx = (title) => {
                var _a;
                return ((_a = settings.ignoreMessages) === null || _a === void 0 ? void 0 : _a.constructor.name) === 'RegExp' &&
                    settings.ignoreMessages.test(title);
            };
            const isImportant = (message) => aboveIgnoreLevel(message) && !skipSubstr(message.message) && !skipRegEx(message.message);
            if (json)
                response.body.messages = (_b = (_a = response.body.messages) === null || _a === void 0 ? void 0 : _a.filter(isImportant)) !== null && _b !== void 0 ? _b : [];
            return response;
        };
        const toValidatorResults = (response) => {
            var _a;
            return ({
                validates: json ? !response.body.messages.length : !!((_a = response.text) === null || _a === void 0 ? void 0 : _a.includes(success)),
                mode: mode,
                title: titleLookup[mode],
                html: inputHtml,
                filename: settings.filename || null,
                website: settings.website || null,
                output: settings.output,
                status: response.statusCode || -1,
                messages: json ? response.body.messages : null,
                display: json ? null : response.text,
            });
        };
        const handleError = (reason) => {
            const response = reason['response'];
            const getMsg = () => [response.status, response.res.statusMessage, response.request.url];
            const message = response ? getMsg() : [reason['errno'], reason.message];
            const networkErr = { type: 'network-error', message: message.join(' ') };
            return toValidatorResults(Object.assign(Object.assign({}, response), { body: { messages: [networkErr] } }));
        };
        return w3cRequest.then(filterMessages).then(toValidatorResults).catch(handleError);
    },
    reporter(results, options) {
        var _a, _b;
        const defaults = {
            maxMessageLen: null,
            quiet: false,
            title: null,
        };
        const settings = Object.assign(Object.assign({}, defaults), options);
        if (typeof (results === null || results === void 0 ? void 0 : results.validates) !== 'boolean')
            throw Error('[w3c-html-validator] Invalid results for reporter(): ' + String(results));
        const messages = (_a = results.messages) !== null && _a !== void 0 ? _a : [];
        const title = (_b = settings.title) !== null && _b !== void 0 ? _b : results.title;
        const status = results.validates ? chalk.green.bold('✔ pass') : chalk.red.bold('✘ fail');
        const count = results.validates ? '' : '(messages: ' + messages.length + ')';
        if (!results.validates || !settings.quiet)
            log(chalk.gray('w3c-html-validator'), status, chalk.blue.bold(title), chalk.white(count));
        const typeColorMap = {
            error: chalk.red.bold,
            warning: chalk.yellow.bold,
            info: chalk.white.bold,
        };
        const logMessage = (message) => {
            var _a, _b;
            const type = message.subType || message.type;
            const typeColor = typeColorMap[type] || chalk.redBright.bold;
            const location = `line ${message.lastLine}, column ${message.firstColumn}:`;
            const lineText = (_a = message.extract) === null || _a === void 0 ? void 0 : _a.replace(/\n/g, '\\n');
            const maxLen = (_b = settings.maxMessageLen) !== null && _b !== void 0 ? _b : undefined;
            log(typeColor('HTML ' + type + ':'), message.message.substring(0, maxLen));
            if (message.lastLine)
                log(chalk.white(location), chalk.magenta(lineText));
        };
        messages.forEach(logMessage);
        return results;
    },
};
export { w3cHtmlValidator };
