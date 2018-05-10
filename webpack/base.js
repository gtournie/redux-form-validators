var webpack = require('webpack')
var path = require('path')

module.exports = {
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  output: {
    library: 'ReduxFormValidators',
    libraryTarget: 'umd',
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'redux-form-validator.js',
  },
  resolve: {
    extensions: ['.js'],
  },
}
