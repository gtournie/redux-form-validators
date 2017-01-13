import assert from 'assert';
import { exclusion } from '../index';
import getErrorId from './helper';

const ERROR_ID = 'form.errors.exclusion';

function test(value, params) {
  return getErrorId(exclusion(params)(value));
}

describe('Validator: exclusion', function() {
  it('should be invalid when `value` is in the list', function() {
    assert.equal(ERROR_ID, test(1,     { in: [9, 8, '1'] }));
    assert.equal(ERROR_ID, test('1',   { in: [9, 8, 1] }));
    assert.equal(ERROR_ID, test('foo', { within: 'foo' }));
  });
  it('should be valid when `value` is not in the list', function() {
    assert.ok(!test(1,     { in: [] }));
    assert.ok(!test('1',   { in: [2, 3, 4] }));
    assert.ok(!test('foo', { within: 'foobar' }));
  });
});
