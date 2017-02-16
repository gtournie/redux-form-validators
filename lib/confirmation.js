'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = confirmation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CASE_SENSITIVE = true;

function confirmation(_ref) {
  var field = _ref.field,
      fieldLabel = _ref.fieldLabel,
      caseSensitive = _ref.caseSensitive,
      message = _ref.message,
      msg = _ref.msg,
      ifCond = _ref['if'],
      unless = _ref.unless;

  msg = (0, _helpers.formatMessage)(msg || message);

  caseSensitive = null != caseSensitive ? caseSensitive : DEFAULT_CASE_SENSITIVE;

  return (0, _helpers.prepare)(ifCond, unless, false, function (value, allValues) {
    var fieldValue = '' + (allValues[field] || '');

    if (caseSensitive ? value !== fieldValue : value.toLowerCase() !== fieldValue.toLowerCase()) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.confirmation',
        defaultMessage: 'doesn\'t match `{fieldLabel}`',
        values: { fieldLabel: fieldLabel || field } });
    }
  });
}