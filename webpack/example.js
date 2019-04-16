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
        test: /\.(es6|js|jsx)$/,
        exclude: /(node_modules|vendor)/,
        use: {
          loader: 'babel-loader',
          query: {
            plugins: [
              [
                'react-intl',
                {
                  messagesDir: './examples/src/locales/extracted',
                  languages: ['en'],
                },
                'react-intl',
              ],
              [
                'react-intl',
                {
                  messagesDir: './examples/src/locales/extracted',
                  moduleSourceName: './redux-form-validators',
                  languages: ['en'],
                },
                'redux-form-validators',
              ],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-function-bind',
              '@babel/plugin-transform-runtime',
            ],
          },
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
    extensions: ['.js', '.scss', '.css'],
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
