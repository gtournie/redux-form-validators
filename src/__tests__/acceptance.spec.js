import assert from 'assert'
import { acceptance } from '../index'
import getErrorId from './helper'

const ERROR_ID = 'form.errors.acceptance'

function test (value, params) {
  return getErrorId(acceptance(params)(value))
}

describe('Validator: acceptance', function() {
  it('should be invalid when `value` is not included in default values', function() {
    assert.equal(ERROR_ID, test())
    assert.equal(ERROR_ID, test(false))
    assert.equal(ERROR_ID, test(''))
    assert.equal(ERROR_ID, test('foo'))
    assert.equal(ERROR_ID, test('false'))
  })
  it('should be valid when `value` is included in default values', function() {
    assert.ok(!test(1))
    assert.ok(!test('1'))
    assert.ok(!test('true'))
    assert.ok(!test(true))
  })
  it('should be valid when `value` is included in custom values', function() {
    assert.ok(!test(1,     { accept: '1' }))
    assert.ok(!test('1',   { accept: 1 }))
    assert.ok(!test('foo', { accept: 'foo' }))
    assert.ok(!test(2,     { accept: ['2'] }))
    assert.ok(!test('2',   { accept: ['foo', 2] }))
  })
  it('should be invalid when `value` is not included in custom values', function() {
    assert.equal(ERROR_ID, test(null, { accept: '1' }))
    assert.equal(ERROR_ID, test('2',  { accept: '1' }))
    assert.equal(ERROR_ID, test('2',  { accept: ['foo', 3] }))
  })
})
