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
  url } from '../index'
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
      assert.equal('foobar', test(key, 'foobar', absence, 'foo'))
      assert.equal('foobar', test(key, 'foobar', acceptance))
      assert.equal('foobar', test(key, 'foobar', confirmation, 'foo', { field: 'bar' }))
      assert.equal('foobar', test(key, 'foobar', email, blank))
      assert.equal('foobar', test(key, 'foobar', date, blank, { format: 'mm/dd/yyyy' }))
      assert.equal('foobar', test(key, 'foobar', exclusion, blank, { in: [blank] }))
      assert.equal('foobar', test(key, 'foobar', file))
      assert.equal('foobar', test(key, 'foobar', format, blank, { with: /^foo$/ }))
      assert.equal('foobar', test(key, 'foobar', inclusion, blank, { in: [] }))
      assert.equal('foobar', test(key, 'foobar', length, blank, { is: 300 }))
      assert.equal('foobar', test(key, 'foobar', numericality, blank))
      assert.equal('foobar', test(key, 'foobar', presence, blank))
      assert.equal('foobar', test(key, 'foobar', url, blank))
      assert.equal('foobar', test(key, { id: 'foobar', defaultMessage: 'foo' }, presence, blank))
    })
  })

  it('should accept different message formats', function () {
    let blank = ''
    ;['msg', 'message'].forEach(function (key) {
      // React Intl element
      assert.equal('foobar', test(key, <FormattedMessage id="foobar" />, absence, 'foo'))

      // Other formats
      assert.equal('foobar', test(key, { absence: 'foobar' }, absence, 'foo'))
      assert.equal('foobar', test(key, { absence: { id: 'foobar' } }, absence, 'foo'))
      assert.equal('foobar', test(key, { wrongLength: { id: 'foobar' }, tooShort: { id: 'min' } }, length, blank, { is: 300 }))
      assert.equal('foobar', test(key, { wrongLength: { id: 'is' }, tooShort: { id: 'foobar' } }, length, blank, { min: 1 }))
      assert.equal('foobar', test(key, { wrongLength: 'foobar', tooShort: 'min' }, length, blank, { is: 300 }))
      assert.equal('foobar', test(key, { wrongLength: 'is', tooShort: 'foobar' }, length, blank, { min: 1 }))
    })
  })

  it('should fallback to default message', function () {
    let blank = ''
    ;['msg', 'message'].forEach(function (key) {
      assert.equal('form.errors.tooShort', test(key, { wrongLength: { id: 'is' } }, length, blank, { min: 1 }))
      assert.equal('form.errors.tooShort', test(key, { wrongLength: { id: 'is' } }, length, blank, { is: 0, min: 1 }))
    })
  })

  it('should override default messages', function () {
    let formatMessage = Validators.getFormatMessage()
    Validators.setFormatMessage(ValidatorsFormatMessage)

    let defaultMessages = Validators.getMessages()
    assert.equal(defaultMessages.presence.defaultMessage, presence()(''))

    Validators.setMessages({
      ...defaultMessages,
      presence: {
        id: 'form.errors.presence',
        defaultMessage: 'is mandatory'
      }
    })
    assert.equal('is mandatory', presence()(''))

    Validators.setMessages({
      ...Validators.getMessages(),
      tooShort: 'is too short: {count} chars expected'
    })
    assert.equal('is too short: 4 chars expected', length({ min: 4 })(''))

    Validators.setMessages({
      ...defaultMessages,
      presence: {
        id: 'form.errors.presence',
        defaultMessage: 'is missing'
      }
    })

    assert.equal('is missing', presence()(''))

    Validators.setMessages(defaultMessages)
    Validators.setFormatMessage(formatMessage)
  })
})
