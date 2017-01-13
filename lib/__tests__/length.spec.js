'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_WRONG_LENGTH_ID = 'form.errors.wrongLength';
var ERROR_TOO_LONG_ID = 'form.errors.tooLong';
var ERROR_TOO_SHORT_ID = 'form.errors.tooShort';

function test(value, params) {
  return (0, _helper2.default)((0, _index.length)(params)(value));
}

describe('Validator: length', function () {
  it('should be invalid when `value.length` is < min', function () {
    _assert2.default.equal(ERROR_TOO_SHORT_ID, test('foobar', { min: 7 }));
    _assert2.default.equal(ERROR_TOO_SHORT_ID, test('foobar', { minimum: 9 }));
  });
  it('should be invalid when `value.length` is > max', function () {
    _assert2.default.equal(ERROR_TOO_LONG_ID, test('f', { max: 0 }));
    _assert2.default.equal(ERROR_TOO_LONG_ID, test('foobar', { max: 5 }));
    _assert2.default.equal(ERROR_TOO_LONG_ID, test('foobar', { maximum: 2 }));
  });
  it('should be invalid when `value.length` is != is', function () {
    _assert2.default.equal(ERROR_WRONG_LENGTH_ID, test('foobar', { '=': 5 }));
    _assert2.default.equal(ERROR_WRONG_LENGTH_ID, test('foobar', { is: 7 }));
  });
  it('should be valid when `value.length` is >= min', function () {
    _assert2.default.ok(!test('', { min: 0 }));
    _assert2.default.ok(!test('foobar', { min: 0 }));
    _assert2.default.ok(!test('foobar', { minimum: 5 }));
  });
  it('should be valid when `value.length` is <= max', function () {
    _assert2.default.ok(!test('', { max: 0 }));
    _assert2.default.ok(!test('foobar', { max: 6 }));
    _assert2.default.ok(!test('foobar', { maximum: 10 }));
  });
  it('should be valid when `value.length` is = is', function () {
    _assert2.default.ok(!test('', { '=': 0 }));
    _assert2.default.ok(!test('foobar', { '=': 6 }));
    _assert2.default.ok(!test('foobar', { is: 6 }));
  });
});