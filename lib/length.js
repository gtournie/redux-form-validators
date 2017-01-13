'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = length;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function length(_ref) {
  var equal = _ref['='],
      is = _ref.is,
      max = _ref.max,
      maximum = _ref.maximum,
      min = _ref.min,
      minimum = _ref.minimum,
      range = _ref['in'],
      within = _ref.within,
      message = _ref.message,
      msg = _ref.msg,
      ifCond = _ref['if'],
      unless = _ref.unless,
      _ref$allowBlank = _ref.allowBlank,
      allowBlank = _ref$allowBlank === undefined ? _helpers.DEFAULT_ALLOW_BLANK : _ref$allowBlank;

  msg = (0, _helpers.formatMessage)(msg || message);

  equal = (0, _helpers.isNumber)(equal) ? equal : is;
  min = (0, _helpers.isNumber)(min) ? min : minimum;
  max = (0, _helpers.isNumber)(max) ? max : maximum;
  range = range || within;
  if (range && (0, _helpers.isNumber)(range[0]) && (0, _helpers.isNumber)(range[1])) {
    min = range[0];
    max = range[1];
  }

  return (0, _helpers.prepare)(ifCond, unless, allowBlank, function (value) {
    if ((0, _helpers.isNumber)(equal) && value.length !== +equal) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.wrongLength',
        defaultMessage: 'is the wrong length (should be {count, number} {count, plural, one {character} other {characters}})',
        values: { count: equal } });
    }
    if ((0, _helpers.isNumber)(max) && value.length > +max) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.tooLong',
        defaultMessage: 'is too long (maximum is {count, number} {count, plural, one {character} other {characters}})',
        values: { count: max } });
    }
    if ((0, _helpers.isNumber)(min) && value.length < +min) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.tooShort',
        defaultMessage: 'is too short (minimum is {count, number} {count, plural, one {character} other {characters}})',
        values: { count: min } });
    }
  });
}