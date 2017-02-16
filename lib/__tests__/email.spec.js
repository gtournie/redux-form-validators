'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_ID = 'form.errors.email';

function test(value, params) {
  return (0, _helper2.default)((0, _index.email)(params)(value));
}

describe('Validator: email', function () {
  it('should be invalid when `value` is not a valid email', function () {
    _assert2.default.equal(ERROR_ID, test(''));
    _assert2.default.equal(ERROR_ID, test('foo'));
    _assert2.default.equal(ERROR_ID, test('foo@bar'));
    _assert2.default.equal(ERROR_ID, test('f@b.'));
  });
  it('should be valid when `value` is a valid email', function () {
    _assert2.default.ok(!test('a@b.com'));
    _assert2.default.ok(!test('foo@bar.net'));
  });
});