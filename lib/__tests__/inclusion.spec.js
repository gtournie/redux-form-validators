'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_ID = 'form.errors.inclusion';

function test(value, params) {
  return (0, _helper2.default)((0, _index.inclusion)(params)(value));
}

describe('Validator: inclusion', function () {
  it('should be invalid when `value` is not in the list', function () {
    _assert2.default.equal(ERROR_ID, test(1, { in: [] }));
    _assert2.default.equal(ERROR_ID, test('1', { in: [2, 3, 4] }));
    _assert2.default.equal(ERROR_ID, test('foo', { within: 'foobar' }));
  });
  it('should be valid when `value` is in the list', function () {
    _assert2.default.ok(!test(1, { in: [9, 8, '1'] }));
    _assert2.default.ok(!test('1', { in: [9, 8, 1] }));
    _assert2.default.ok(!test('foo', { within: 'foo' }));
  });
});