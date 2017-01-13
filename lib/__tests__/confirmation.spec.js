'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_ID = 'form.errors.confirmation';

function test(value, params, allValues) {
  return (0, _helper2.default)((0, _index.confirmation)(params || { field: 'password_confirmation' })(value, allValues || { password_confirmation: 'validator' }));
}

describe('Validator: confirmation', function () {
  it('should be invalid when `value` != confirmation', function () {
    _assert2.default.equal(ERROR_ID, test('val'));
  });
  it('should be invalid when confirmation field doesn\'t exists', function () {
    _assert2.default.equal(ERROR_ID, test('validator', { field: 'passwordconfirmation' }));
  });
  it('should be valid when `value` = confirmation', function () {
    _assert2.default.ok(!test('validator'));
    _assert2.default.ok(!test(123, { field: 'foo' }, { foo: '123' }));
  });
});