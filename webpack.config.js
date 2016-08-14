const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    'quak': './src/entry.js',
    'quak.min': './src/entry.js'
  },
  output: {
    path: './lib',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'quak'
  },
  resolve: {
    root: [
      path.resolve('./src'),
      path.resolve('./src/views')
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      excluce: /node_modules/,
      query: {
        presets: ['es2015'],
        plugins: ['add-module-exports']
      }
    }]
  }
}
