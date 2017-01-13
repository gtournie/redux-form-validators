'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INVALID_MSG = undefined;
exports.default = format;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVALID_MSG = exports.INVALID_MSG = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.invalid', defaultMessage: 'is invalid' });

function format(_ref) {
  var wit = _ref['with'],
      without = _ref.without,
      message = _ref.message,
      msg = _ref.msg,
      ifCond = _ref['if'],
      unless = _ref.unless,
      _ref$allowBlank = _ref.allowBlank,
      allowBlank = _ref$allowBlank === undefined ? _helpers.DEFAULT_ALLOW_BLANK : _ref$allowBlank;

  msg = (0, _helpers.formatMessage)(msg || message);

  return (0, _helpers.prepare)(ifCond, unless, allowBlank, function (value) {
    if (wit && !value.match(wit) || without && value.match(without)) {
      return msg || INVALID_MSG;
    }
  });
}