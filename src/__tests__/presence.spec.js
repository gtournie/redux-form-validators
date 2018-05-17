import assert from 'assert'
import Validators, { presence, required } from '../index'
import getErrorId from './helper'

const ERROR_ID = 'form.errors.presence'

function test (value) {
  return getErrorId(presence()(value))
}

describe('Validator: presence', function() {
  it('should be invalid when `value` is empty', function() {
    assert.equal(ERROR_ID, test())
    assert.equal(ERROR_ID, test(null))
    assert.equal(ERROR_ID, test(''))
    assert.equal(ERROR_ID, test('   '))
    assert.equal(ERROR_ID, test(' \n \t '))
    assert.equal(ERROR_ID, test(new FileList()))
    assert.equal(ERROR_ID, test(new FileList({ length: 0 })))
    assert.equal(ERROR_ID, test(new FileList([])))
    assert.equal(ERROR_ID, getErrorId(required()(' \n \t '))) // Alias
  })
  it('should be valid when `value` is not empty', function() {
    assert.ok(!test(1))
    assert.ok(!test('str'))
    assert.ok(!test(' abc '))
    assert.ok(!test(new File()))
    assert.ok(!test(new FileList({ length: 1 })))
    assert.ok(!test(new FileList([{}])))
    assert.ok(!getErrorId(required()(' abc ')))
  })
  it('should use formatMessage', function() {
    let defaultValue = Validators.getFormatMessage()

    Validators.setFormatMessage(function(msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    })
    assert.equal(ERROR_ID + '2', test(''))

    Validators.setFormatMessage(defaultValue)
  })
})
