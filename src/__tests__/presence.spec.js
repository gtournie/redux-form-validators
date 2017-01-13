import assert from 'assert';
import { presence, required } from '../index';
import getErrorId from './helper';

const ERROR_ID = 'form.errors.presence';

function test(value) {
  return getErrorId(presence()(value));
}

describe('Validator: presence', function() {
  it('should be invalid when `value` is empty', function() {
    assert.equal(ERROR_ID, test());
    assert.equal(ERROR_ID, test(''));
    assert.equal(ERROR_ID, test('   '));
    assert.equal(ERROR_ID, test(' \n \t '));
    assert.equal(ERROR_ID, getErrorId(required()(' \n \t '))); // Alias
  });
  it('should be valid when `value` is not empty', function() {
    assert.ok(!test(1));
    assert.ok(!test('str'));
    assert.ok(!test(' abc '));
    assert.ok(!getErrorId(required()(' abc ')));
  });
});
