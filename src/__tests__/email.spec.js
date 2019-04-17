import assert from 'assert'
import Validators, { email } from '../index'
import getErrorId from './helper'

const ERROR_EMAIL = 'form.errors.email'
const ERROR_EMAIL_DOMAIN = 'form.errors.emailDomain'

function test (value, params) {
  return getErrorId(email(params)(value))
}

describe('Validator: email', function () {
  it('should be invalid when `value` is not a valid email', function () {
    assert.strictEqual(ERROR_EMAIL, test(''))
    assert.strictEqual(ERROR_EMAIL, test('foo'))
    assert.strictEqual(ERROR_EMAIL, test('foo@bar'))
    assert.strictEqual(ERROR_EMAIL, test('f@b.'))
  })
  it('should be valid when `value` is a valid email', function () {
    assert.ok(!test('a@b.com'))
    assert.ok(!test('foo@bar.net'))
  })
  it('should be valid when the domain is an accepted domain', function () {
    assert.ok(!test('a@b.com', { domainWhitelist: ['a.com', 'b.com', 'c.com'] }))
    assert.ok(!test('a@b.com', { domainWhitelist: ['B.com'] }))
    assert.ok(!test('a@B.COM', { domainWhitelist: ['b.com'] }))
    assert.ok(!test('a@b.com', { domainWhitelist: ['b.*'] }))
    assert.ok(!test('a@b.com', { domainWhitelist: ['B.*'] }))
    assert.ok(!test('a@B.COM', { domainWhitelist: ['b.*'] }))
    assert.ok(!test('a@b.com', { domainWhitelist: ['*.com'] }))
    assert.ok(!test('a@b.com', { domainWhitelist: ['*'] }))
    assert.ok(!test('a@sub.stuff.com', { domainWhitelist: ['*.stuff.*'] }))
    assert.ok(!test('a@b.com', { domainBlacklist: ['a.com', 'c.com', 'd.com'] }))
    assert.ok(!test('a@b.com', { domainBlacklist: ['ab*.com', 'ba*.com'] }))
  })
  it('should be invalid when the domain is not an accepted domain', function () {
    assert.strictEqual(ERROR_EMAIL_DOMAIN, test('a@b.com', { domainWhitelist: ['a.com', 'c.com', 'd.com'] }))
    assert.strictEqual(ERROR_EMAIL_DOMAIN, test('a@b.com', { domainWhitelist: ['ab*.com', 'ba*.com'] }))
    assert.strictEqual(ERROR_EMAIL_DOMAIN, test('a@b.com', { domainBlacklist: ['a.com', 'b.com', 'c.com'] }))
    assert.strictEqual(ERROR_EMAIL_DOMAIN, test('a@b.com', { domainBlacklist: ['b.*'] }))
    assert.strictEqual(ERROR_EMAIL_DOMAIN, test('a@b.com', { domainBlacklist: ['*.com'] }))
    assert.strictEqual(ERROR_EMAIL_DOMAIN, test('a@b.com', { domainBlacklist: ['*'] }))
    assert.strictEqual(ERROR_EMAIL_DOMAIN, test('a@sub.stuff.com', { domainBlacklist: ['*.stuff.*'] }))
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.strictEqual(ERROR_EMAIL + '2', test('foo'))

    Validators.formatMessage = defaultValue
  })
})
