'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_ALLOW_BLANK = undefined;
exports.regFormat = regFormat;
exports.prepare = prepare;
exports.trunc = trunc;
exports.isNumber = isNumber;
exports.formatMessage = formatMessage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _format = require('./format');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_ALLOW_BLANK = exports.DEFAULT_ALLOW_BLANK = false;

function regFormat(options, reg, messageId) {
  options.msg = options.msg || options.message || messageId;
  options.with = reg;
  return (0, _format2.default)(options);
}

function prepare(ifCond, unlessCond, allowBlank, func) {
  return function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var allValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    value = '' + value;
    if (allowBlank && !value.trim()) {
      return;
    }
    if (('function' !== typeof ifCond || ifCond(allValues, value)) && ('function' !== typeof unlessCond || !unlessCond(allValues, value))) {
      return func(value, allValues);
    }
  };
}

function trunc(num) {
  return Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num);
}

function isNumber(num) {
  return !isNaN(num) && '' !== ('' + num).trim();
}

function formatMessage(msg) {
  if (null == msg) return null;
  return 'string' === typeof msg ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: msg }) : _react2.default.createElement(_reactIntl.FormattedMessage, msg.props || msg);
}