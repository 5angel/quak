const path = require('path')

module.exports = {
  entry: './src/entry.js',
  output: {
    path: './lib',
    filename: 'quak.js',
    libraryTarget: 'umd',
    library: 'quak'
  },
  resolve: {
    root: [
      path.resolve('./src'),
      path.resolve('./src/views')
    ]
  },
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
