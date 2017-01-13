'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_INC_ID = 'form.errors.include';
var ERROR_EXC_ID = 'form.errors.exclude';

function test(value, params) {
  return (0, _helper2.default)((0, _index.content)(params)(value));
}

describe('Validator: content', function () {
  it('should be invalid when inc not included in `value`', function () {
    _assert2.default.equal(ERROR_INC_ID, test(123, { inc: '0' }));
    _assert2.default.equal(ERROR_INC_ID, test('123', { inc: '00' }));
    _assert2.default.equal(ERROR_INC_ID, test('foo', { include: 'foobar' }));
  });
  it('should be invalid when exc is included in `value`', function () {
    _assert2.default.equal(ERROR_EXC_ID, test(123, { exc: '1' }));
    _assert2.default.equal(ERROR_EXC_ID, test('123', { exc: '23' }));
    _assert2.default.equal(ERROR_EXC_ID, test('foobar', { exclude: 'foo' }));
  });
  it('should be valid when inc is included in `value`', function () {
    _assert2.default.ok(!test(1234567, { inc: 345 }));
    _assert2.default.ok(!test('12344', { inc: '34' }));
    _assert2.default.ok(!test('foobar', { include: 'foo' }));
  });
  it('should be valid when exc is included in `value`', function () {
    _assert2.default.ok(!test(123, { exc: '0' }));
    _assert2.default.ok(!test('123', { exc: '00' }));
    _assert2.default.ok(!test('foo', { exclude: 'foobar' }));
  });
});