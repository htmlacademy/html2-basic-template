"use strict";

var _pluginError = _interopRequireDefault(require("plugin-error"));

var _stream = require("stream");

var _svgo = require("svgo");

var _getSvgoConfig = require("./get-svgo-config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PLUGIN_NAME = 'gulp-svgmin';

module.exports = function (options) {
  const optionsFunction = typeof options === 'function';
  const stream = new _stream.Transform({
    objectMode: true
  });

  stream._transform = function (file, encoding, cb) {
    if (file.isStream()) {
      return cb(new _pluginError.default(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      (0, _getSvgoConfig.getSvgoConfig)(optionsFunction ? options(file) : options, optionsFunction).then(config => {
        const result = (0, _svgo.optimize)(String(file.contents), config); // Ignore svgo meta data and return the SVG string.

        if (typeof result.data === 'string') {
          file.contents = Buffer.from(result.data);
          return cb(null, file);
        } // Otherwise, throw an error, even if it is undefined.


        throw result.error;
      }).catch(error => cb(new _pluginError.default(PLUGIN_NAME, error)));
      return;
    } // Handle all other cases, like file.isNull(), file.isDirectory().


    return cb(null, file);
  };

  return stream;
};