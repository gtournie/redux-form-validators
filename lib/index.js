'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.required = exports.REG_URL = exports.REG_EMAIL = exports.DEFAULT_ALLOW_BLANK = exports.ACCEPT = undefined;
exports.addValidator = addValidator;
exports.presence = presence;
exports.absence = absence;
exports.acceptance = acceptance;
exports.length = length;
exports.numericality = numericality;
exports.confirmation = confirmation;
exports.format = format;
exports.email = email;
exports.url = url;
exports.inclusion = inclusion;
exports.exclusion = exclusion;
exports.content = content;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACCEPT = exports.ACCEPT = ['1', 'true'];
var DEFAULT_ALLOW_BLANK = exports.DEFAULT_ALLOW_BLANK = false;

var REG_EMAIL = exports.REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

var REG_URL = exports.REG_URL = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

var INVALID_MSG = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.invalid', defaultMessage: 'is invalid' });

// To be extractable by react-intl
var emailError = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.email', defaultMessage: 'is not a valid email' });
var urlError = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.url', defaultMessage: 'is not a valid URL' });

// TODO:
// credit card
// Case sensitive for confirmation, content, acceptance, inclusion, exclusion
// Format: without option
// Length: 'in'
// Numericality: other_than

function addValidator(_ref) {
  var validator = _ref.validator,
      defaultMessage = _ref.defaultMessage,
      defaultMsg = _ref.defaultMsg;

  defaultMsg = _formatMessage(defaultMsg || defaultMessage) || INVALID_MSG;

  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    options = Object.assign({}, options);
    var blankAllowed = null == options.allowBlank ? DEFAULT_ALLOW_BLANK : options.allowBlank;
    delete options.allowBlank;

    var msg = _formatMessage(options.msg || options.message) || defaultMsg;

    return _prepare(options.if, options.unless, blankAllowed, function (value, allValues) {
      if (!validator(options, value, allValues)) {
        return msg;
      }
    });
  };
}

function presence() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      message = _ref2.message,
      msg = _ref2.msg,
      ifCond = _ref2['if'],
      unless = _ref2.unless;

  msg = _formatMessage(msg || message) || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.presence', defaultMessage: 'is required' });

  return _prepare(ifCond, unless, false, function (value) {
    if (!value.trim()) {
      return msg;
    }
  });
}
var required = exports.required = presence;

function absence() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      message = _ref3.message,
      msg = _ref3.msg,
      ifCond = _ref3['if'],
      unless = _ref3.unless;

  msg = _formatMessage(msg || message) || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.absence', defaultMessage: 'must be blank' });

  return _prepare(ifCond, unless, false, function (value) {
    if (value.trim()) {
      return msg;
    }
  });
}

function acceptance() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$accept = _ref4.accept,
      accept = _ref4$accept === undefined ? ACCEPT : _ref4$accept,
      message = _ref4.message,
      msg = _ref4.msg,
      ifCond = _ref4['if'],
      unless = _ref4.unless;

  msg = _formatMessage(msg || message) || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.acceptance', defaultMessage: 'must be accepted' });

  accept = [].concat(accept).map(String);

  return _prepare(ifCond, unless, false, function (value) {
    if (accept.indexOf(value) < 0) {
      return msg;
    }
  });
}

function length(_ref5) {
  var equal = _ref5['='],
      is = _ref5.is,
      max = _ref5.max,
      maximum = _ref5.maximum,
      min = _ref5.min,
      minimum = _ref5.minimum,
      message = _ref5.message,
      msg = _ref5.msg,
      ifCond = _ref5['if'],
      unless = _ref5.unless,
      _ref5$allowBlank = _ref5.allowBlank,
      allowBlank = _ref5$allowBlank === undefined ? DEFAULT_ALLOW_BLANK : _ref5$allowBlank;

  msg = _formatMessage(msg || message);

  min = _isNumber(min) ? min : minimum;
  max = _isNumber(max) ? max : maximum;
  equal = _isNumber(equal) ? equal : is;

  return _prepare(ifCond, unless, allowBlank, function (value) {
    if (_isNumber(equal) && value.length !== +equal) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.wrongLength',
        defaultMessage: 'is the wrong length (should be {count, number} {count, plural, one {character} other {characters}})',
        values: { count: equal } });
    }
    if (_isNumber(max) && value.length > +max) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.tooLong',
        defaultMessage: 'is too long (maximum is {count, number} {count, plural, one {character} other {characters}})',
        values: { count: max } });
    }
    if (_isNumber(min) && value.length < +min) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.tooShort',
        defaultMessage: 'is too short (minimum is {count, number} {count, plural, one {character} other {characters}})',
        values: { count: min } });
    }
  });
}

function numericality() {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      int = _ref6.int,
      integer = _ref6.integer,
      even = _ref6.even,
      odd = _ref6.odd,
      equal = _ref6['='],
      equalTo = _ref6.equalTo,
      greater = _ref6['>'],
      greaterThan = _ref6.greaterThan,
      less = _ref6['<'],
      lessThan = _ref6.lessThan,
      greaterOrEqual = _ref6['>='],
      greaterThanOrEqualTo = _ref6.greaterThanOrEqualTo,
      lessOrEqual = _ref6['<='],
      lessThanOrEqualTo = _ref6.lessThanOrEqualTo,
      message = _ref6.message,
      msg = _ref6.msg,
      ifCond = _ref6['if'],
      unless = _ref6.unless,
      _ref6$allowBlank = _ref6.allowBlank,
      allowBlank = _ref6$allowBlank === undefined ? DEFAULT_ALLOW_BLANK : _ref6$allowBlank;

  msg = _formatMessage(msg || message);

  int = int || integer;
  equal = _isNumber(equal) ? equal : equalTo;
  greater = _isNumber(greater) ? greater : greaterThan;
  less = _isNumber(less) ? less : lessThan;
  greaterOrEqual = _isNumber(greaterOrEqual) ? greaterOrEqual : greaterThanOrEqualTo;
  lessOrEqual = _isNumber(lessOrEqual) ? lessOrEqual : lessThanOrEqualTo;

  return _prepare(ifCond, unless, allowBlank, function (value) {
    if (!_isNumber(value)) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.notANumber', defaultMessage: 'is not a number' });
    }
    if (int && +value % 1) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.notANumber' });
    }
    if (_isNumber(equal) && +value !== +equal) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.equalTo',
        defaultMessage: 'must be equal to {count, number}',
        values: { count: equal } });
    }
    if (_isNumber(greater) && +value <= +greater) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.greaterThan',
        defaultMessage: 'must be greater than {count, number}',
        values: { count: greater } });
    }
    if (_isNumber(greaterOrEqual) && +value < +greaterOrEqual) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.greaterThanOrEqualTo',
        defaultMessage: 'must be greater than or equal to {count, number}',
        values: { count: greaterOrEqual } });
    }
    if (_isNumber(less) && +value >= +less) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.lessThan',
        defaultMessage: 'must be less than {count, number}',
        values: { count: less } });
    }
    if (_isNumber(lessOrEqual) && +value > +lessOrEqual) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.lessThanOrEqualTo',
        defaultMessage: 'must be less than or equal to {count, number}',
        values: { count: lessOrEqual } });
    }
    if (even && _trunc(+value) % 2) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.even', defaultMessage: 'must be even' });
    }
    if (odd && !(_trunc(+value) % 2)) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.odd', defaultMessage: 'must be odd' });
    }
  });
}

function confirmation(_ref7) {
  var field = _ref7.field,
      fieldLabel = _ref7.fieldLabel,
      message = _ref7.message,
      msg = _ref7.msg,
      ifCond = _ref7['if'],
      unless = _ref7.unless;

  msg = _formatMessage(msg || message);

  return _prepare(ifCond, unless, false, function (value, allValues) {
    if (value !== '' + allValues[field]) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.confirmation',
        defaultMessage: 'doesn\'t match `{fieldLabel}`',
        values: { fieldLabel: fieldLabel || field } });
    }
  });
}

function format(_ref8) {
  var wit = _ref8['with'],
      message = _ref8.message,
      msg = _ref8.msg,
      ifCond = _ref8['if'],
      unless = _ref8.unless,
      _ref8$allowBlank = _ref8.allowBlank,
      allowBlank = _ref8$allowBlank === undefined ? DEFAULT_ALLOW_BLANK : _ref8$allowBlank;

  msg = _formatMessage(msg || message);

  return _prepare(ifCond, unless, allowBlank, function (value) {
    if (!value.match(wit)) {
      return msg || INVALID_MSG;
    }
  });
}

function email(options) {
  return _reg(options, REG_EMAIL, "form.errors.email");
}

function url(options) {
  return _reg(options, REG_URL, "form.errors.url");
}

function inclusion(_ref9) {
  var inc = _ref9['in'],
      within = _ref9.within,
      message = _ref9.message,
      msg = _ref9.msg,
      ifCond = _ref9['if'],
      unless = _ref9.unless,
      _ref9$allowBlank = _ref9.allowBlank,
      allowBlank = _ref9$allowBlank === undefined ? DEFAULT_ALLOW_BLANK : _ref9$allowBlank;

  msg = _formatMessage(msg || message);

  within = [].concat(within || inc).map(String);
  return _prepare(ifCond, unless, allowBlank, function (value) {
    if (within.indexOf(value) < 0) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.inclusion', defaultMessage: 'is not included in the list' });
    }
  });
}

function exclusion(_ref10) {
  var inc = _ref10['in'],
      within = _ref10.within,
      message = _ref10.message,
      msg = _ref10.msg,
      ifCond = _ref10['if'],
      unless = _ref10.unless,
      _ref10$allowBlank = _ref10.allowBlank,
      allowBlank = _ref10$allowBlank === undefined ? DEFAULT_ALLOW_BLANK : _ref10$allowBlank;

  msg = _formatMessage(msg || message);
  within = [].concat(within || inc).map(String);

  return _prepare(ifCond, unless, allowBlank, function (value) {
    if (within.indexOf(value) >= 0) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.exclusion', defaultMessage: 'is reserved' });
    }
  });
}

function content() {
  var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      inc = _ref11.inc,
      include = _ref11.include,
      exc = _ref11.exc,
      exclude = _ref11.exclude,
      message = _ref11.message,
      msg = _ref11.msg,
      ifCond = _ref11['if'],
      unless = _ref11.unless,
      _ref11$allowBlank = _ref11.allowBlank,
      allowBlank = _ref11$allowBlank === undefined ? DEFAULT_ALLOW_BLANK : _ref11$allowBlank;

  msg = _formatMessage(msg || message);

  inc = inc || include;
  exc = exc || exclude;

  return _prepare(ifCond, unless, allowBlank, function (value) {
    if (inc && value.indexOf(inc) < 0) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.include',
        defaultMessage: 'should include `{value}`',
        values: { value: inc } });
    }
    if (exc && value.indexOf(exc) >= 0) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.exclude',
        defaultMessage: 'should not include `{value}`',
        values: { value: exc } });
    }
  });
}

// private
function _reg(options, reg, messageId) {
  options = Object.assign({}, options);
  options.msg = options.msg || options.message || messageId;
  options.with = reg;
  return format(options);
}

function _prepare(ifCond, unlessCond, allowBlank, func) {
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

function _trunc(num) {
  return Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num);
}

function _isNumber(num) {
  return !isNaN(num) && '' !== ('' + num).trim();
}

function _formatMessage(msg) {
  if (null == msg) return null;
  return 'string' === typeof msg ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: msg }) : _react2.default.createElement(_reactIntl.FormattedMessage, msg);
}