import assert from 'assert'
import Validators, { email } from '../index'
import getErrorId from './helper'

const ERROR_ID = 'form.errors.email'

function test (value, params) {
  return getErrorId(email(params)(value))
}

describe('Validator: email', function () {
  it('should be invalid when `value` is not a valid email', function () {
    assert.equal(ERROR_ID, test(''))
    assert.equal(ERROR_ID, test('foo'))
    assert.equal(ERROR_ID, test('foo@bar'))
    assert.equal(ERROR_ID, test('f@b.'))
  })
  it('should be valid when `value` is a valid email', function () {
    assert.ok(!test('a@b.com'))
    assert.ok(!test('foo@bar.net'))
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.equal(ERROR_ID + '2', test('foo'))

    Validators.formatMessage = defaultValue
  })
})
