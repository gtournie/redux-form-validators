import assert from 'assert'
import Validators, { exclusion } from '../index'
import getErrorId from './helper'

const ERROR_ID = 'form.errors.exclusion'

function test (value, params) {
  return getErrorId(exclusion(params)(value))
}

describe('Validator: exclusion', function () {
  it('should be invalid when `value` is in the list', function () {
    assert.strictEqual(ERROR_ID, test(1, { in: [9, 8, '1'] }))
    assert.strictEqual(ERROR_ID, test('1', { in: [9, 8, 1] }))
    assert.strictEqual(ERROR_ID, test('foo', { within: 'foo' }))
    assert.strictEqual(ERROR_ID, test('foo', { within: ['foo'], caseSensitive: true }))
    assert.strictEqual(ERROR_ID, test('FOO', { within: ['foo'], caseSensitive: false }))
  })
  it('should be valid when `value` is not in the list', function () {
    assert.ok(!test(1, { in: [] }))
    assert.ok(!test('1', { in: [2, 3, 4] }))
    assert.ok(!test('foo', { within: 'foobar' }))
    assert.ok(!test('foo', { within: ['FOO'], caseSensitive: true }))
    assert.ok(!test('FOO', { within: ['bar'], caseSensitive: false }))
  })
  it('should use default caseSensitive option', function () {
    let defaultValue = Validators.defaultOptions.caseSensitive

    Validators.defaultOptions.caseSensitive = true
    assert.ok(!test('foo', { within: 'FOO' }))

    Validators.defaultOptions.caseSensitive = false
    assert.ok(!test('foo', { within: 'fooo' }))

    Validators.defaultOptions.caseSensitive = defaultValue
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.strictEqual(ERROR_ID + '2', test('foo', { within: 'foo' }))

    Validators.formatMessage = defaultValue
  })
})
