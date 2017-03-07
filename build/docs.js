const path = require('path');
let baseConf = require('./base');
let merge = require('webpack-merge');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConf, {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, '../'),
    filename: 'demo.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: './src/index.html',
      filename: 'demo.html',
      inject: true
    })
  ]
});
