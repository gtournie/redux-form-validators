import assert from 'assert'
import Validators, { inclusion } from '../index'
import getErrorId from './helper'

const ERROR_ID = 'form.errors.inclusion'

function test (value, params) {
  return getErrorId(inclusion(params)(value))
}

describe('Validator: inclusion', function () {
  it('should be invalid when `value` is not in the list', function () {
    assert.strictEqual(ERROR_ID, test(1, { in: [] }))
    assert.strictEqual(ERROR_ID, test('1', { in: [2, 3, 4] }))
    assert.strictEqual(ERROR_ID, test('foo', { within: 'foobar' }))
    assert.strictEqual(ERROR_ID, test('FOO', { within: ['foobar'], caseSensitive: false }))
    assert.strictEqual(ERROR_ID, test('FOO', { within: ['foo'], caseSensitive: true }))
  })
  it('should be valid when `value` is in the list', function () {
    assert.ok(!test(1, { in: [9, 8, '1'] }))
    assert.ok(!test('1', { in: [9, 8, 1] }))
    assert.ok(!test('foo', { within: 'foo' }))
    assert.ok(!test('foo', { within: ['bar', 'foo'], caseSensitive: true }))
    assert.ok(!test('FOO', { within: ['foo'], caseSensitive: false }))
    assert.ok(!test('fOo', { within: ['foo'], caseSensitive: false }))
  })
  it('should use default caseSensitive option', function () {
    let defaultValue = Validators.defaultOptions.caseSensitive

    Validators.defaultOptions.caseSensitive = true
    assert.ok(!test('foo', { within: 'foo' }))

    Validators.defaultOptions.caseSensitive = false
    assert.ok(!test('foo', { within: 'FOO' }))

    Validators.defaultOptions.caseSensitive = defaultValue
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.strictEqual(ERROR_ID + '2', test('1', { in: [2, 3, 4] }))

    Validators.formatMessage = defaultValue
  })
})
