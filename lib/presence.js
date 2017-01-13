'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = presence;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function presence() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      message = _ref.message,
      msg = _ref.msg,
      ifCond = _ref['if'],
      unless = _ref.unless;

  msg = (0, _helpers.formatMessage)(msg || message) || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.presence', defaultMessage: 'is required' });

  return (0, _helpers.prepare)(ifCond, unless, false, function (value) {
    if (!value.trim()) {
      return msg;
    }
  });
}