import assert from 'assert';
import { absence } from '../index';
import getErrorId from './helper';

const ERROR_ID = 'form.errors.absence';

function test(value) {
  return getErrorId(absence()(value));
}

describe('Validator: absence', function () {
  it('should be invalid when `value` is not empty', function() {
    assert.equal(ERROR_ID, test(1));
    assert.equal(ERROR_ID, test('str'));
    assert.equal(ERROR_ID, test(' abc '));
  });
  it('should be valid when `value` is empty', function() {
    assert.ok(!test());
    assert.ok(!test(''));
    assert.ok(!test('   '));
    assert.ok(!test(' \n \t '));
  });
});
