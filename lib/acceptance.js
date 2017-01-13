'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACCEPT = undefined;
exports.default = acceptance;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACCEPT = exports.ACCEPT = ['1', 'true'];

function acceptance() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$accept = _ref.accept,
      accept = _ref$accept === undefined ? ACCEPT : _ref$accept,
      message = _ref.message,
      msg = _ref.msg,
      ifCond = _ref['if'],
      unless = _ref.unless;

  msg = (0, _helpers.formatMessage)(msg || message) || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.acceptance', defaultMessage: 'must be accepted' });

  accept = [].concat(accept).map(String);

  return (0, _helpers.prepare)(ifCond, unless, false, function (value) {
    if (accept.indexOf(value) < 0) {
      return msg;
    }
  });
}