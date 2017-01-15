import assert from 'assert';
import { confirmation } from '../index';
import getErrorId from './helper';

const ERROR_ID = 'form.errors.confirmation';


function test(value, params, allValues) {
  params = Object.assign({ field: 'password_confirmation' }, params || {});
  return getErrorId(confirmation(params)(value, allValues || { password_confirmation: 'validator' }));
}

describe('Validator: confirmation', function() {
  it('should be invalid when `value` != confirmation', function() {
    assert.equal(ERROR_ID, test('val'));
    assert.equal(ERROR_ID, test('val',       { caseSensitive: false }));
    assert.equal(ERROR_ID, test('VALIDATOR', { caseSensitive: true }));
    assert.equal(ERROR_ID, test('valiDator', { caseSensitive: true }));
  });
  it('should be invalid when confirmation field doesn\'t exists', function() {
    assert.equal(ERROR_ID, test('validator', { field: 'passwordconfirmation' }));
  });
  it('should be valid when `value` = confirmation', function() {
    assert.ok(!test('', { field: 'foo' }, {}));
    assert.ok(!test('validator'));
    assert.ok(!test('VALIDATOR', { caseSensitive: false }));
    assert.ok(!test('valiDator', { caseSensitive: false }));
    assert.ok(!test(123,         { field: 'foo' }, { foo: '123' }));
  });
});
