import assert from 'assert';
import { confirmation } from '../index';
import getErrorId from './helper';

const ERROR_ID = 'form.errors.confirmation';


function test(value, params, allValues) {
  return getErrorId(confirmation(params || { field: 'password_confirmation' })
    (value, allValues || { password_confirmation: 'validator' }));
}

describe('Validator: confirmation', function() {
  it('should be invalid when `value` != confirmation', function() {
    assert.equal(ERROR_ID, test('val'));
  });
  it('should be invalid when confirmation field doesn\'t exists', function() {
    assert.equal(ERROR_ID, test('validator', { field: 'passwordconfirmation' }));
  });
  it('should be valid when `value` = confirmation', function() {
    assert.ok(!test('validator'));
    assert.ok(!test(123, { field: 'foo' }, { foo: '123' }));
  });
});
