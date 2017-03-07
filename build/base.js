const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          'css': 'vue-style-loader!css-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  }
};
