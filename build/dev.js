let merge = require('webpack-merge');
let baseWebpackConfig = require('./base');

module.exports = merge(baseWebpackConfig, {
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
});
