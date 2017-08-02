var webpack = require('webpack');


module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'ReduxFormValidators',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js']
  }
};