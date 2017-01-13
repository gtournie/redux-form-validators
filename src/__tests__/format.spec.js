import assert from 'assert';
import { format } from '../index';
import getErrorId from './helper';

const ERROR_ID = 'form.errors.invalid';

function test(value, params) {
  return getErrorId(format(params)(value));
}

describe('Validator: format', function() {
  it('should be invalid when `value` doesn\'t match the with', function() {
    assert.equal(ERROR_ID, test('',     { with: /123/ }));
    assert.equal(ERROR_ID, test(12,     { with: /123/ }));
    assert.equal(ERROR_ID, test('foor', { with: /bar/ }));
  });
  it('should be valid when `value` match the with', function() {
    assert.ok(!test('',    { with: /.?/ }));
    assert.ok(!test(123,   { with: /\d+/ }));
    assert.ok(!test('foo', { with: /\w+/ }));
  });
});
