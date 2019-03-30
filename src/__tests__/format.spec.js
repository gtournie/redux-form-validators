import assert from 'assert'
import Validators, { format } from '../index'
import getErrorId from './helper'

const ERROR_ID = 'form.errors.invalid'

function test (value, params) {
  return getErrorId(format(params)(value))
}

describe('Validator: format', function () {
  it("should be invalid when `value` doesn't match the with option", function () {
    assert.strictEqual(ERROR_ID, test('', { with: /123/ }))
    assert.strictEqual(ERROR_ID, test(12, { with: /123/ }))
    assert.strictEqual(ERROR_ID, test('foo', { with: /bar/ }))
  })
  it("should be invalid when `value` doesn't match the without option", function () {
    assert.strictEqual(ERROR_ID, test('', { without: /.?/ }))
    assert.strictEqual(ERROR_ID, test(123, { without: /\d+/ }))
    assert.strictEqual(ERROR_ID, test('foo', { without: /\w+/ }))
  })
  it('should be valid when `value` match the with option', function () {
    assert.ok(!test('', { with: /.?/ }))
    assert.ok(!test(123, { with: /\d+/ }))
    assert.ok(!test('foo', { with: /\w+/ }))
  })
  it('should be valid when `value` match the without option', function () {
    assert.ok(!test('', { without: /123/ }))
    assert.ok(!test(12, { without: /123/ }))
    assert.ok(!test('foo', { without: /bar/ }))
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.strictEqual(ERROR_ID + '2', test(123, { without: /\d+/ }))

    Validators.formatMessage = defaultValue
  })
})
