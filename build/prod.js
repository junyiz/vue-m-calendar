const path = require('path');
let merge = require('webpack-merge');
let baseConf = require('./base');

module.exports = merge(baseConf, {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue-m-calendar.js',
    library: 'VueMCalendar',
    libraryTarget: 'umd'
  }
});
