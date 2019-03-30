import assert from 'assert'
import Validators, { length } from '../index'
import getErrorId from './helper'

const ERROR_WRONG_LENGTH_ID = 'form.errors.wrongLength'
const ERROR_TOO_LONG_ID = 'form.errors.tooLong'
const ERROR_TOO_SHORT_ID = 'form.errors.tooShort'

function test (value, params) {
  return getErrorId(length(params)(value))
}

describe('Validator: length', function () {
  it('should be invalid when `value.length` is < min', function () {
    assert.strictEqual(ERROR_TOO_SHORT_ID, test('foobar', { min: 7 }))
    assert.strictEqual(ERROR_TOO_SHORT_ID, test('foobar', { minimum: 9 }))
  })
  it('should be invalid when `value.length` is > max', function () {
    assert.strictEqual(ERROR_TOO_LONG_ID, test('f', { max: 0 }))
    assert.strictEqual(ERROR_TOO_LONG_ID, test('foobar', { max: 5 }))
    assert.strictEqual(ERROR_TOO_LONG_ID, test('foobar', { maximum: 2 }))
  })
  it('should be invalid when `value.length` is not included in range', function () {
    assert.strictEqual(ERROR_TOO_SHORT_ID, test('f', { in: [2, 6] }))
    assert.strictEqual(ERROR_TOO_LONG_ID, test('foobar', { in: [0, 5] }))
    assert.strictEqual(ERROR_TOO_LONG_ID, test('foobar', { within: [5, 5] }))
  })
  it('should be invalid when `value.length` is != is', function () {
    assert.strictEqual(ERROR_WRONG_LENGTH_ID, test('foobar', { '=': 5 }))
    assert.strictEqual(ERROR_WRONG_LENGTH_ID, test('foobar', { is: 7 }))
  })
  it('should be valid when `value.length` is >= min', function () {
    assert.ok(!test('', { min: 0 }))
    assert.ok(!test('foobar', { min: 0 }))
    assert.ok(!test('foobar', { minimum: 5 }))
  })
  it('should be valid when `value.length` is <= max', function () {
    assert.ok(!test('', { max: 0 }))
    assert.ok(!test('foobar', { max: 6 }))
    assert.ok(!test('foobar', { maximum: 10 }))
  })
  it('should be valid when `value.length` is in range', function () {
    assert.ok(!test('', { in: [0, 120] }))
    assert.ok(!test('foobar', { in: [6, 8] }))
    assert.ok(!test('foobar', { within: [0, 6] }))
  })
  it('should be valid when `value.length` is = is', function () {
    assert.ok(!test('', { '=': 0 }))
    assert.ok(!test('foobar', { '=': 6 }))
    assert.ok(!test('foobar', { is: 6 }))
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.strictEqual(ERROR_TOO_SHORT_ID + '2', test('foobar', { min: 7 }))
    assert.strictEqual(ERROR_TOO_LONG_ID + '2', test('f', { max: 0 }))
    assert.strictEqual(ERROR_WRONG_LENGTH_ID + '2', test('foobar', { is: 7 }))

    Validators.formatMessage = defaultValue
  })
})
