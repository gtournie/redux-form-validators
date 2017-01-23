'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = date;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DATE_RANGE_ERROR = _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.dateRange', defaultMessage: 'shoud be {op} {date}' });

var DATE_METHODS = {
  y: function y(d) {
    return d.getFullYear();
  },
  m: function m(d) {
    return d.getMonth() + 1;
  },
  d: function d(_d) {
    return _d.getDate();
  }
};

var PARSE_REG = /[ymd]+/g;

function date(_ref) {
  var _reverseMapping;

  var format = _ref.format,
      ymd = _ref.ymd,
      eq = _ref['='],
      diff = _ref['!='],
      gt = _ref['>'],
      gte = _ref['>='],
      lt = _ref['<'],
      lte = _ref['<='],
      message = _ref.message,
      msg = _ref.msg,
      ifCond = _ref['if'],
      unless = _ref.unless,
      _ref$allowBlank = _ref.allowBlank,
      allowBlank = _ref$allowBlank === undefined ? _helpers.DEFAULT_ALLOW_BLANK : _ref$allowBlank;

  msg = (0, _helpers.formatMessage)(msg || message);
  ymd = ymd || 'ymd';
  var reverseMapping = (_reverseMapping = {}, _defineProperty(_reverseMapping, ymd.charAt(0), 'y'), _defineProperty(_reverseMapping, ymd.charAt(1), 'm'), _defineProperty(_reverseMapping, ymd.charAt(2), 'd'), _reverseMapping);
  var normFormat = format.replace(new RegExp('[' + ymd + ']', 'g'), function (sym) {
    return reverseMapping[sym];
  });

  return (0, _helpers.prepare)(ifCond, unless, allowBlank, function (value) {
    var date = checkDate(value, normFormat);
    if ('wrongFormat' === date) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.dateFormat',
        defaultMessage: 'expected format: {format}',
        values: { format: format } });
    }
    if ('invalid' === date) {
      return msg || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'form.errors.dateInvalid', defaultMessage: 'is not a valid date' });
    }
    if (date) {
      var date2 = void 0;
      if (eq && +date !== +(date2 = getDate(eq))) {
        return msg || dateRangeError({ op: '=', date: formatDate(date2, normFormat) });
      }
      if (diff && +date === +(date2 = getDate(diff))) {
        return msg || dateRangeError({ op: '!=', date: formatDate(date2, normFormat) });
      }
      if (gt && date <= (date2 = getDate(gt))) {
        return msg || dateRangeError({ op: '>', date: formatDate(date2, normFormat) });
      }
      if (gte && date < (date2 = getDate(gte))) {
        return msg || dateRangeError({ op: '>=', date: formatDate(date2, normFormat) });
      }
      if (lt && date >= (date2 = getDate(lt))) {
        return msg || dateRangeError({ op: '<', date: formatDate(date2, normFormat) });
      }
      if (lte && date > (date2 = getDate(lte))) {
        return msg || dateRangeError({ op: '<=', date: formatDate(date2, normFormat) });
      }
    }
  });
}

function dateRangeError(values) {
  return (0, _helpers.formatMessage)({ id: 'form.errors.dateRange', values: values });
}

function getDate(d) {
  if ('function' === typeof d) {
    return new Date(+d());
  }
  if (isNaN(d) && 'today' === ('' + d).toLowerCase()) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }
  return new Date(+d);
}

// FORMAT
function formatDate(date, format) {
  return format.replace(PARSE_REG, function (m) {
    return padding(DATE_METHODS[m.charAt(0)](date), m.length);
  });
}
function padding(num, pad) {
  return '0'.repeat(Math.max(0, pad - ('' + num).length)) + num;
}

// PARSE
function checkDate(value, format) {
  var order = [];
  var reg = new RegExp('^' + format.replace(PARSE_REG, function (m) {
    order.push(m.charAt(0));
    return '([0-9]{' + m.length + '})';
  }) + '$');
  var match = value.match(reg);
  if (match) {
    var _ret = function () {
      var flags = {};
      order.forEach(function (token, index) {
        flags[token] = +match[index + 1];
      });
      var comparable = null != flags.y ? null != flags.m ? true : null == flags.d : false;
      flags = Object.assign({ y: 1970, m: 1, d: 1 }, flags);
      if (flags.y < 100) {
        flags.y = currentCentury(flags.y >= 69 ? -1 : 0) * 100 + flags.y;
      }
      var date = new Date(flags.y, flags.m - 1, flags.d);
      return {
        v: checkFlags(date, flags) ? comparable ? date : null : 'invalid'
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return 'wrongFormat';
}

function currentCentury(add) {
  var century = (0, _helpers.trunc)(new Date().getFullYear() / 100);
  return century < 0 ? century - add : century + add;
}

function checkFlags(date, flags) {
  var _ref2 = [date.getFullYear(), date.getMonth() + 1, date.getDate()],
      year = _ref2[0],
      month = _ref2[1],
      day = _ref2[2];

  return year === flags.y && month === flags.m && day === flags.d;
}