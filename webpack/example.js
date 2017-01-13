var path = require("path");
var webpack = require('webpack');
var PORT = process.env.PORT || 3003;

module.exports = {
  devtool: 'inline-source-map',
  entry: ['bootstrap-loader', "./src/index.js"],
  context: path.resolve(process.cwd(), "examples"),
  output: {
    path: 'examples/.tmp',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015", "stage-2"],
          plugins: [
            ["react-intl", {
              "messagesDir": "./examples/src/locales/extracted",
              "enforceDescriptions": false,
              "languages": ["en"]
            }]
          ]
        }
      },
      {
        test: /\.html$/,
        loaders: ['html-loader']
      },
      {
        test: /\.json/,
        loaders: ['json-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    root: [path.join(process.cwd(), 'examples')],
    alias: { 'redux-form-validators': path.join(process.cwd(), 'src/index.js') },
    extensions: ['', '.js', '.jsx', '.es6', '.scss', '.css'],
    modulesDirectories: [
      'examples',
      'node_modules'
    ]
  },
  devServer: {
    contentBase: 'examples',
    noInfo: false, //  --no-info option
    historyApiFallback: true,
    progress: true,
    hot: true,
    inline: true,
    port: PORT
  }
};