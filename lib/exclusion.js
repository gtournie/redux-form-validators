'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exclusion;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exclusion(_ref) {
  var inc = _ref['in'],
      within = _ref.within,
      message = _ref.message,
      msg = _ref.msg,
      ifCond = _ref['if'],
      unless = _ref.unless,
      _ref$allowBlank = _ref.allowBlank,
      allowBlank = _ref$allowBlank === undefined ? _helpers.DEFAULT_ALLOW_BLANK : _ref$allowBlank;

  msg = (0, _helpers.formatMessage)(msg || message);
  within = [].concat(within || inc).map(String);

  return (0, _helpers.prepare)(ifCond, unless, allowBlank, function (value) {
    if (within.indexOf(value) >= 0) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.exclusion', defaultMessage: 'is reserved' });
    }
  });
}