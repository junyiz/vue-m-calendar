let merge = require('webpack-merge');
let baseWebpackConfig = require('./base');

let config = merge(baseWebpackConfig, {
  entry: './src/index.js'
});

config.output.filename = 'vue-m-calendar.js';
config.output.library = 'VueMCalendar';
config.output.libraryTarget = 'umd';

module.exports = config;
