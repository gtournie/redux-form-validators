import assert from 'assert'
import Validators, {
  absence,
  date,
  acceptance,
  confirmation,
  email,
  exclusion,
  file,
  format,
  inclusion,
  length,
  numericality,
  presence,
  url
} from '../index'
import getErrorId from './helper'

/* eslint-disable no-unused-vars */
import React from 'react'
import { FormattedMessage } from 'react-intl'
/* eslint-enable no-unused-vars */

function test (key, msg, func, value, params = {}) {
  params[key] = msg
  return getErrorId(func(params)(value))
}

describe('Validator option: message', function () {
  it('should return a custom message', function () {
    let blank = ''
    ;['msg', 'message'].forEach(function (key) {
      assert.strictEqual('foobar', test(key, 'foobar', absence, 'foo'))
      assert.strictEqual('foobar', test(key, 'foobar', acceptance))
      assert.strictEqual('foobar', test(key, 'foobar', confirmation, 'foo', { field: 'bar' }))
      assert.strictEqual('foobar', test(key, 'foobar', email, blank))
      assert.strictEqual('foobar', test(key, 'foobar', date, blank, { format: 'mm/dd/yyyy' }))
      assert.strictEqual('foobar', test(key, 'foobar', exclusion, blank, { in: [blank] }))
      assert.strictEqual('foobar', test(key, 'foobar', file))
      assert.strictEqual('foobar', test(key, 'foobar', format, blank, { with: /^foo$/ }))
      assert.strictEqual('foobar', test(key, 'foobar', inclusion, blank, { in: [] }))
      assert.strictEqual('foobar', test(key, 'foobar', length, blank, { is: 300 }))
      assert.strictEqual('foobar', test(key, 'foobar', numericality, blank))
      assert.strictEqual('foobar', test(key, 'foobar', presence, blank))
      assert.strictEqual('foobar', test(key, 'foobar', url, blank))
      assert.strictEqual('foobar', test(key, { id: 'foobar', defaultMessage: 'foo' }, presence, blank))
    })
  })

  it('should accept different message formats', function () {
    let blank = ''
    ;['msg', 'message'].forEach(function (key) {
      // React Intl element
      assert.strictEqual('foobar', test(key, <FormattedMessage id="foobar" />, absence, 'foo'))

      // Other formats
      assert.strictEqual('foobar', test(key, { absence: 'foobar' }, absence, 'foo'))
      assert.strictEqual('foobar', test(key, { format: 'foobar' }, date, blank, { format: 'mm/dd/yyyy' }))
      assert.strictEqual('foobar', test(key, { range: 'foobar' }, date, '2000-01-01', { '<': new Date(1999, 0, 1) }))
      assert.strictEqual(
        'foobar',
        test(key, { '<': 'foobar', range: 'foo' }, date, '2000-01-01', { '<': new Date(1999, 0, 1) })
      )
      assert.strictEqual('foobar', test(key, { absence: { id: 'foobar' } }, absence, 'foo'))
      assert.strictEqual(
        'foobar',
        test(key, { wrongLength: { id: 'foobar' }, tooShort: { id: 'min' } }, length, blank, { is: 300 })
      )
      assert.strictEqual(
        'foobar',
        test(key, { wrongLength: { id: 'is' }, tooShort: { id: 'foobar' } }, length, blank, { min: 1 })
      )
      assert.strictEqual('foobar', test(key, { wrongLength: 'foobar', tooShort: 'min' }, length, blank, { is: 300 }))
      assert.strictEqual('foobar', test(key, { wrongLength: 'is', tooShort: 'foobar' }, length, blank, { min: 1 }))
    })
  })

  it('should fallback to default message', function () {
    let blank = ''
    ;['msg', 'message'].forEach(function (key) {
      assert.strictEqual('form.errors.tooShort', test(key, { wrongLength: { id: 'is' } }, length, blank, { min: 1 }))
      assert.strictEqual(
        'form.errors.tooShort',
        test(key, { wrongLength: { id: 'is' } }, length, blank, { is: 0, min: 1 })
      )
    })
  })

  it('should override default messages', function () {
    let formatMessage = Validators.formatMessage
    Validators.formatMessage = global.ValidatorsFormatMessage

    let defaultMessages = Validators.messages
    assert.strictEqual(defaultMessages.presence.defaultMessage, presence()(''))

    Validators.messages.presence = {
      id: 'form.errors.presence',
      defaultMessage: 'is mandatory'
    }
    assert.strictEqual('is mandatory', presence()(''))
    let tooShort = Validators.messages.tooShort
    Validators.messages.tooShort = 'is too short: {count} chars expected'
    assert.strictEqual('is too short: 4 chars expected', length({ min: 4 })(''))
    Validators.messages.tooShort = tooShort

    Object.assign(Validators.messages, {
      presence: {
        id: 'form.errors.presence',
        defaultMessage: 'is missing'
      }
    })
    assert.strictEqual('is missing', presence()(''))

    Validators.messages = defaultMessages
    Validators.formatMessage = formatMessage
  })
})
