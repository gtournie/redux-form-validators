'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REG_URL = undefined;
exports.default = url;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REG_URL = exports.REG_URL = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

// To be extracted by react-intl
var URL_ERROR = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.url', defaultMessage: 'is not a valid URL' });

function url(options) {
  return (0, _helpers.regFormat)(options, REG_URL, "form.errors.url");
}