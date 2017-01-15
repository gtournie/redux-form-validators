'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BLANK_STRINGS = ['', ' ', ' \n \t '];

function test(func, value, params) {
  return (0, _helper2.default)(func(params)(value)) || '';
}

describe('Validator option: allowBlank', function () {
  it('should be invalid when `value` is blank', function () {
    BLANK_STRINGS.forEach(function (blank) {
      _assert2.default.ok(test(_index.email, blank).indexOf('form.errors') === 0);
      _assert2.default.ok(test(_index.date, blank, { format: 'mm/dd/yyyy' }).indexOf('form.errors') === 0);
      _assert2.default.ok(test(_index.exclusion, blank, { in: BLANK_STRINGS }).indexOf('form.errors') === 0);
      _assert2.default.ok(test(_index.format, blank, { with: /^foo$/ }).indexOf('form.errors') === 0);
      _assert2.default.ok(test(_index.inclusion, blank, { in: [] }).indexOf('form.errors') === 0);
      _assert2.default.ok(test(_index.length, blank, { is: 300 }).indexOf('form.errors') === 0);
      _assert2.default.ok(test(_index.numericality, blank).indexOf('form.errors') === 0);
      _assert2.default.ok(test(_index.url, blank).indexOf('form.errors') === 0);
    });
  });
  it('should be invalid when `value` is blank with allowBlank: true', function () {
    BLANK_STRINGS.forEach(function (blank) {
      _assert2.default.ok(!test(_index.email, blank, { allowBlank: true }));
      _assert2.default.ok(!test(_index.date, blank, { format: 'mm/dd/yyyy', allowBlank: true }));
      _assert2.default.ok(!test(_index.exclusion, blank, { in: BLANK_STRINGS, allowBlank: true }));
      _assert2.default.ok(!test(_index.format, blank, { with: /^foo$/, allowBlank: true }));
      _assert2.default.ok(!test(_index.inclusion, blank, { in: [], allowBlank: true }));
      _assert2.default.ok(!test(_index.length, blank, { is: 300, allowBlank: true }));
      _assert2.default.ok(!test(_index.numericality, blank, { allowBlank: true }));
      _assert2.default.ok(!test(_index.url, blank, _defineProperty({ allowBlank: true }, 'allowBlank', true)));
    });
  });
});