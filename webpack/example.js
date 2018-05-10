var path = require('path')
var webpack = require('webpack')
var PORT = process.env.PORT || 3003

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./src/index.js'],
  context: path.resolve(process.cwd(), 'examples'),
  output: {
    path: path.resolve(process.cwd(), 'examples/.tmp'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: [
            [
              'react-intl',
              {
                messagesDir: './examples/src/locales/extracted',
                languages: ['en'],
              },
            ],
            [
              'react-intl',
              {
                messagesDir: './examples/src/locales/extracted',
                moduleSourceName: './redux-form-validators',
                languages: ['en'],
              },
            ],
          ],
        },
      },
      {
        test: /\.html$/,
        loaders: ['html-loader'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.optimize.ModuleConcatenationPlugin()],
  resolve: {
    alias: { 'redux-form-validators': path.join(process.cwd(), 'src/index.js') },
    extensions: ['.js', '.jsx', '.es6', '.scss', '.css'],
    modules: [path.join(process.cwd(), 'examples'), 'examples', 'node_modules'],
  },
  devServer: {
    contentBase: 'examples',
    noInfo: false, //  --no-info option
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: PORT,
  },
}
