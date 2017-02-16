'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inclusion = inclusion;
exports.exclusion = exclusion;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CASE_SENSITIVE = true;

function inclusion(options) {
  return inclusionExclusion(true, options);
}

function exclusion(options) {
  return inclusionExclusion(false, options);
}

function inclusionExclusion(inclusion, _ref) {
  var inc = _ref['in'],
      within = _ref.within,
      caseSensitive = _ref.caseSensitive,
      message = _ref.message,
      msg = _ref.msg,
      ifCond = _ref['if'],
      unless = _ref.unless,
      _ref$allowBlank = _ref.allowBlank,
      allowBlank = _ref$allowBlank === undefined ? _helpers.DEFAULT_ALLOW_BLANK : _ref$allowBlank;

  msg = (0, _helpers.formatMessage)(msg || message);

  caseSensitive = null != caseSensitive ? caseSensitive : DEFAULT_CASE_SENSITIVE;

  within = [].concat(within || inc).map(function (val) {
    return caseSensitive ? '' + val : ('' + val).toLowerCase();
  });

  return (0, _helpers.prepare)(ifCond, unless, allowBlank, function (value) {
    if (!caseSensitive) {
      value = value.toLowerCase();
    }
    if (inclusion) {
      if (within.indexOf(value) < 0) {
        return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.inclusion', defaultMessage: 'is not included in the list' });
      }
    } else {
      if (within.indexOf(value) >= 0) {
        return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.exclusion', defaultMessage: 'is reserved' });
      }
    }
  });
}