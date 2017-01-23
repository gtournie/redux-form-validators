import assert from 'assert'
import { inclusion } from '../index'
import getErrorId from './helper'

const ERROR_ID = 'form.errors.inclusion'

function test (value, params) {
  return getErrorId(inclusion(params)(value))
}

describe('Validator: inclusion', function() {
  it('should be invalid when `value` is not in the list', function() {
    assert.equal(ERROR_ID, test(1,     { in: [] }))
    assert.equal(ERROR_ID, test('1',   { in: [2, 3, 4] }))
    assert.equal(ERROR_ID, test('foo', { within: 'foobar' }))
    assert.equal(ERROR_ID, test('FOO', { within: ['foobar'], caseSensitive: false }))
    assert.equal(ERROR_ID, test('FOO', { within: ['foo'], caseSensitive: true }))
  })
  it('should be valid when `value` is in the list', function() {
    assert.ok(!test(1,     { in: [9, 8, '1'] }))
    assert.ok(!test('1',   { in: [9, 8, 1] }))
    assert.ok(!test('foo', { within: 'foo' }))
    assert.ok(!test('foo', { within: ['bar', 'foo'], caseSensitive: true }))
    assert.ok(!test('FOO', { within: ['foo'], caseSensitive: false }))
    assert.ok(!test('fOo', { within: ['foo'], caseSensitive: false }))
  })
})
