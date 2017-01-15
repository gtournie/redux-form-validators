import assert from 'assert';
import { addValidator } from '../index';
import getErrorId from './helper';


const fooValidator = addValidator({
  defaultMessage: 'form.errors.foo',
  validator:  function(options, value) {
    return value === 'foo';
  }
});

const barValidator = addValidator({
  validator:  function(options, value, allValues) {
    return value === 'bar' && allValues['foobar'] === 'foobar';
  }
});

const invalidValidator = addValidator({
  validator:  function(options, value) {
    return options.invalid === 'valid';
  }
});

function test(validator, value, params, allValues) {
  return getErrorId(validator(params)(value, allValues));
}

describe('Validator: addValidator', function() {
  it('should be invalid', function() {
    assert.equal('form.errors.foo', test(fooValidator, 'bar'));
    assert.equal('form.errors.bar', test(barValidator, 'foo', { msg: 'form.errors.bar' }, { bar: 'foo' }));
    assert.equal('form.errors.invalid', test(invalidValidator, '', { invalid: 'invalid' }));
  });
  it('should be valid', function() {
    assert.ok(!test(fooValidator, 'foo'));
    assert.ok(!test(fooValidator, '', { allowBlank: true }));
    assert.ok(!test(fooValidator, 'bar', { if: function() { return false; } }));
    assert.ok(!test(fooValidator, 'bar', { unless: function() { return true; } }));
    assert.ok(!test(barValidator, 'bar', {}, { foobar: 'foobar' }));
    assert.ok(!test(invalidValidator, '', { invalid: 'valid' }));
  });
});
