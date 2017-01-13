'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = numericality;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function numericality() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      int = _ref.int,
      integer = _ref.integer,
      even = _ref.even,
      odd = _ref.odd,
      equal = _ref['='],
      equalTo = _ref.equalTo,
      diff = _ref['!='],
      otherThan = _ref.otherThan,
      greater = _ref['>'],
      greaterThan = _ref.greaterThan,
      less = _ref['<'],
      lessThan = _ref.lessThan,
      greaterOrEqual = _ref['>='],
      greaterThanOrEqualTo = _ref.greaterThanOrEqualTo,
      lessOrEqual = _ref['<='],
      lessThanOrEqualTo = _ref.lessThanOrEqualTo,
      message = _ref.message,
      msg = _ref.msg,
      ifCond = _ref['if'],
      unless = _ref.unless,
      _ref$allowBlank = _ref.allowBlank,
      allowBlank = _ref$allowBlank === undefined ? _helpers.DEFAULT_ALLOW_BLANK : _ref$allowBlank;

  msg = (0, _helpers.formatMessage)(msg || message);

  int = int || integer;
  equal = (0, _helpers.isNumber)(equal) ? equal : equalTo;
  diff = (0, _helpers.isNumber)(diff) ? diff : otherThan;
  greater = (0, _helpers.isNumber)(greater) ? greater : greaterThan;
  less = (0, _helpers.isNumber)(less) ? less : lessThan;
  greaterOrEqual = (0, _helpers.isNumber)(greaterOrEqual) ? greaterOrEqual : greaterThanOrEqualTo;
  lessOrEqual = (0, _helpers.isNumber)(lessOrEqual) ? lessOrEqual : lessThanOrEqualTo;

  return (0, _helpers.prepare)(ifCond, unless, allowBlank, function (value) {
    if (!(0, _helpers.isNumber)(value)) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.notANumber', defaultMessage: 'is not a number' });
    }
    if (int && +value % 1) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.notANumber' });
    }
    if ((0, _helpers.isNumber)(equal) && +value !== +equal) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.equalTo',
        defaultMessage: 'must be equal to {count, number}',
        values: { count: equal } });
    }
    if ((0, _helpers.isNumber)(diff) && +value === +diff) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.otherThan',
        defaultMessage: 'must be other than {count, number}',
        values: { count: diff } });
    }
    if ((0, _helpers.isNumber)(greater) && +value <= +greater) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.greaterThan',
        defaultMessage: 'must be greater than {count, number}',
        values: { count: greater } });
    }
    if ((0, _helpers.isNumber)(greaterOrEqual) && +value < +greaterOrEqual) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.greaterThanOrEqualTo',
        defaultMessage: 'must be greater than or equal to {count, number}',
        values: { count: greaterOrEqual } });
    }
    if ((0, _helpers.isNumber)(less) && +value >= +less) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.lessThan',
        defaultMessage: 'must be less than {count, number}',
        values: { count: less } });
    }
    if ((0, _helpers.isNumber)(lessOrEqual) && +value > +lessOrEqual) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.lessThanOrEqualTo',
        defaultMessage: 'must be less than or equal to {count, number}',
        values: { count: lessOrEqual } });
    }
    if (even && (0, _helpers.trunc)(+value) % 2) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.even', defaultMessage: 'must be even' });
    }
    if (odd && !((0, _helpers.trunc)(+value) % 2)) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.odd', defaultMessage: 'must be odd' });
    }
  });
}