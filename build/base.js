const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['es2015', {modules: false}]] //不要把ES6的注入模块方法转成CommonJS
          }
        }]
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'vue-loader',
          options: {
            'css': 'vue-style-loader!css-loader'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  }
};
