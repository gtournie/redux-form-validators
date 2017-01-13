'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_ID = 'form.errors.invalid';

function test(value, params) {
  return (0, _helper2.default)((0, _index.format)(params)(value));
}

describe('Validator: format', function () {
  it('should be invalid when `value` doesn\'t match the with', function () {
    _assert2.default.equal(ERROR_ID, test('', { with: /123/ }));
    _assert2.default.equal(ERROR_ID, test(12, { with: /123/ }));
    _assert2.default.equal(ERROR_ID, test('foor', { with: /bar/ }));
  });
  it('should be valid when `value` match the with', function () {
    _assert2.default.ok(!test('', { with: /.?/ }));
    _assert2.default.ok(!test(123, { with: /\d+/ }));
    _assert2.default.ok(!test('foo', { with: /\w+/ }));
  });
});