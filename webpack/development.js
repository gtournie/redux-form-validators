'use strict';

var webpack = require('webpack');
var baseConfig = require('./base');

var config = Object.create(baseConfig);
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin()
];

module.exports = config;