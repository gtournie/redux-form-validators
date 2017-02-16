'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REG_EMAIL = undefined;
exports.default = email;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REG_EMAIL = exports.REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

// To be extracted by react-intl
var EMAIL_ERROR = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.email', defaultMessage: 'is not a valid email' });

function email(options) {
  options = Object.assign({}, options);
  return (0, _helpers.regFormat)(options, REG_EMAIL, "form.errors.email");
}