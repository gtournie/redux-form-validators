'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_ID = 'form.errors.presence';

function test(value) {
  return (0, _helper2.default)((0, _index.presence)()(value));
}

describe('Validator: presence', function () {
  it('should be invalid when `value` is empty', function () {
    _assert2.default.equal(ERROR_ID, test());
    _assert2.default.equal(ERROR_ID, test(''));
    _assert2.default.equal(ERROR_ID, test('   '));
    _assert2.default.equal(ERROR_ID, test(' \n \t '));
    _assert2.default.equal(ERROR_ID, (0, _helper2.default)((0, _index.required)()(' \n \t '))); // Alias
  });
  it('should be valid when `value` is not empty', function () {
    _assert2.default.ok(!test(1));
    _assert2.default.ok(!test('str'));
    _assert2.default.ok(!test(' abc '));
    _assert2.default.ok(!(0, _helper2.default)((0, _index.required)()(' abc ')));
  });
});