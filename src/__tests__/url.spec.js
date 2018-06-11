import assert from 'assert'
import Validators, { url } from '../index'
import getErrorId from './helper'

const ERROR_ID = 'form.errors.url'

function test (value, params) {
  return getErrorId(url(params)(value))
}

describe('Validator: url', function () {
  it('should be invalid when `value` is not a valid url', function () {
    assert.equal(ERROR_ID, test(''))
    assert.equal(ERROR_ID, test('http:/:/'))
    assert.equal(ERROR_ID, test('htpp:/www.google.com'))
    assert.equal(ERROR_ID, test('ftp//ft.com'))
  })
  it('should be valid when `value` is a valid url', function () {
    assert.ok(!test('http://google.com'))
    assert.ok(!test('https://www.google.com'))
    assert.ok(!test('http://foo:bar@128.193.1.32:3000/foo?foo=bar'))
  })
  it("should be invalid if the protocols don't match", function () {
    assert.equal(ERROR_ID, test('http://google.com', { protocol: 'ftp' }))
    assert.equal(ERROR_ID, test('http://google.com', { protocol: ['ftp', 'https'] }))
    assert.equal(ERROR_ID, test('http://google.com', { protocols: 'https' }))
    assert.equal(ERROR_ID, test('http://google.com', { protocols: ['ftp', 'https'] }))
    assert.equal(ERROR_ID, test('https://www.google.com', { protocol: 'ftp' }))
    assert.equal(ERROR_ID, test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar', { protocol: 'http' }))
  })
  it('should only be valid with certain protocols', function () {
    assert.ok(!test('http://google.com', { protocol: 'http' }))
    assert.ok(!test('http://google.com', { protocol: ['http', 'https'] }))
    assert.ok(!test('http://google.com', { protocol: ['ftp', 'http', 'https'] }))
    assert.ok(!test('http://google.com', { protocols: 'http' }))
    assert.ok(!test('http://google.com', { protocols: ['ftp', 'http', 'https'] }))
    assert.ok(!test('https://www.google.com', { protocol: 'https' }))
    assert.ok(!test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar', { protocol: 'ftp' }))
  })
  it('should use default urlProtocols option', function () {
    let defaultValue = Validators.defaultOptions.urlProtocols

    Validators.defaultOptions.urlProtocols = ['ftp']
    assert.equal(ERROR_ID, test('http://google.com'))
    assert.equal(ERROR_ID, test('https://www.google.com'))
    assert.equal(ERROR_ID, test('http://foo:bar@128.193.1.32:3000/foo?foo=bar'))
    assert.ok(!test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar'))

    Validators.defaultOptions.urlProtocols = ['http', 'https']
    assert.ok(!test('http://google.com'))
    assert.ok(!test('https://www.google.com'))
    assert.ok(!test('http://foo:bar@128.193.1.32:3000/foo?foo=bar'))
    assert.equal(ERROR_ID, test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar'))

    Validators.defaultOptions.urlProtocols = defaultValue
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.equal(ERROR_ID + '2', test('http:/:/'))

    Validators.formatMessage = defaultValue
  })
})
