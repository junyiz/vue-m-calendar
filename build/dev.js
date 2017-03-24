const path = require('path');
let merge = require('webpack-merge');
let baseConf = require('./base');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConf, {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new HtmlwebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true
    })
  ]
});
