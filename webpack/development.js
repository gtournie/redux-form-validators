'use strict'

var webpack = require('webpack')

var config = require('./base')
config.mode = 'development'
config.plugins = [new webpack.optimize.ModuleConcatenationPlugin()]

module.exports = config
