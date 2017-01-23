'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addValidator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

var _format = require('./format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addValidator(_ref) {
  var validator = _ref.validator,
      defaultMessage = _ref.defaultMessage,
      defaultMsg = _ref.defaultMsg;

  defaultMsg = (0, _helpers.formatMessage)(defaultMsg || defaultMessage) || _format.INVALID_MSG;

  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var msg = (0, _helpers.formatMessage)(options.msg || options.message) || defaultMsg;

    return (0, _helpers.prepare)(options.if, options.unless, options.allowBlank, function (value, allValues) {
      if (!validator(options, value, allValues)) {
        return msg;
      }
    });
  };
}