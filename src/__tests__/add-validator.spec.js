import assert from 'assert'
import Validators, { addValidator } from '../index'
import getErrorId from './helper'

const fooValidator = addValidator({
  defaultMessage: 'form.errors.foo',
  validator: function (options, value) {
    return value === 'foo'
  }
})

const barValidator = addValidator({
  validator: function (options, value, allValues) {
    return value === 'bar' && allValues['foobar'] === 'foobar'
  }
})

const invalidValidator = addValidator({
  validator: function (options, value) {
    return options.invalid === 'valid'
  }
})

const digitValidator = addValidator({
  validator: function (options, value, allValues) {
    if (options.digits !== value.replace(/[^0-9]/g, '').length) {
      return { id: 'form.errors.digits' }
    }
  }
})

function test (validator, value, params, allValues, props, name) {
  return getErrorId(validator(params)(value, allValues, props, name))
}

describe('Validator: addValidator', function () {
  it('should be invalid', function () {
    assert.equal('form.errors.foo', test(fooValidator, 'bar'))
    assert.equal('form.errors.bar', test(barValidator, 'foo', { msg: 'form.errors.bar' }, { bar: 'foo' }))
    assert.equal('form.errors.invalid', test(invalidValidator, '', { invalid: 'invalid' }))
    assert.equal('form.errors.digits', test(digitValidator, '1 23', { digits: 4 }))
  })
  it('should be valid', function () {
    assert.ok(!test(fooValidator, 'foo'))
    assert.ok(!test(fooValidator, '', { allowBlank: true }))
    assert.ok(
      !test(fooValidator, 'bar', {
        if: function () {
          return false
        }
      })
    )
    assert.ok(
      !test(fooValidator, 'bar', {
        unless: function () {
          return true
        }
      })
    )
    assert.ok(!test(barValidator, 'bar', {}, { foobar: 'foobar' }))
    assert.ok(!test(invalidValidator, '', { invalid: 'valid' }))
    assert.ok(!test(digitValidator, '1 2 3 4', { digits: 4 }))
  })
  it('should not use formatMessage when valid', function () {
    let defaultValue = Validators.getFormatMessage()

    /* istanbul ignore next */
    Validators.setFormatMessage(function (msg) {
      return msg.id
    })

    assert.ok(!digitValidator({ digits: 4 })('1 2 3 4'))

    Validators.setFormatMessage(defaultValue)
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.getFormatMessage()

    Validators.setFormatMessage(function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    })
    assert.equal('form.errors.foo2', test(fooValidator, 'bar'))

    Validators.setFormatMessage(defaultValue)
  })
})
