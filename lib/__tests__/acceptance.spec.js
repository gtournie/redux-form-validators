'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_ID = 'form.errors.acceptance';

function test(value, params) {
  return (0, _helper2.default)((0, _index.acceptance)(params)(value));
}

describe('Validator: acceptance', function () {
  it('should be invalid when `value` is not included in default values', function () {
    _assert2.default.equal(ERROR_ID, test());
    _assert2.default.equal(ERROR_ID, test(false));
    _assert2.default.equal(ERROR_ID, test(''));
    _assert2.default.equal(ERROR_ID, test('foo'));
    _assert2.default.equal(ERROR_ID, test('false'));
  });
  it('should be valid when `value` is included in default values', function () {
    _assert2.default.ok(!test(1));
    _assert2.default.ok(!test('1'));
    _assert2.default.ok(!test('true'));
    _assert2.default.ok(!test(true));
  });
  it('should be valid when `value` is included in custom values', function () {
    _assert2.default.ok(!test(1, { accept: '1' }));
    _assert2.default.ok(!test('1', { accept: 1 }));
    _assert2.default.ok(!test('foo', { accept: 'foo' }));
    _assert2.default.ok(!test(2, { accept: ['2'] }));
    _assert2.default.ok(!test('2', { accept: ['foo', 2] }));
  });
  it('should be invalid when `value` is not included in custom values', function () {
    _assert2.default.equal(ERROR_ID, test(null, { accept: '1' }));
    _assert2.default.equal(ERROR_ID, test('2', { accept: '1' }));
    _assert2.default.equal(ERROR_ID, test('2', { accept: ['foo', 3] }));
  });
});