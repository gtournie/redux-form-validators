'use strict'

var webpack = require('webpack')

var config = require('./base')
config.mode = 'production'
config.output.filename = 'redux-form-validators.min.js'
config.plugins = [new webpack.optimize.ModuleConcatenationPlugin()]

module.exports = config
