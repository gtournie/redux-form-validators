'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fooValidator = (0, _index.addValidator)({
  defaultMessage: 'form.errors.foo',
  validator: function validator(options, value) {
    return value === 'foo';
  }
});

var barValidator = (0, _index.addValidator)({
  validator: function validator(options, value, allValues) {
    return value === 'bar' && allValues['foobar'] === 'foobar';
  }
});

var invalidValidator = (0, _index.addValidator)({
  validator: function validator(options, value) {
    return options.invalid === 'valid';
  }
});

function test(validator, value, params, allValues) {
  return (0, _helper2.default)(validator(params)(value, allValues));
}

describe('Validator: addValidator', function () {
  it('should be invalid', function () {
    _assert2.default.equal('form.errors.foo', test(fooValidator, 'bar'));
    _assert2.default.equal('form.errors.bar', test(barValidator, 'foo', { msg: 'form.errors.bar' }, { bar: 'foo' }));
    _assert2.default.equal('form.errors.invalid', test(invalidValidator, '', { invalid: 'invalid' }));
  });
  it('should be valid', function () {
    _assert2.default.ok(!test(fooValidator, 'foo'));
    _assert2.default.ok(!test(fooValidator, '', { allowBlank: true }));
    _assert2.default.ok(!test(fooValidator, 'bar', { if: function _if() {
        return false;
      } }));
    _assert2.default.ok(!test(fooValidator, 'bar', { unless: function unless() {
        return true;
      } }));
    _assert2.default.ok(!test(barValidator, 'bar', {}, { foobar: 'foobar' }));
    _assert2.default.ok(!test(invalidValidator, '', { invalid: 'valid' }));
  });
});