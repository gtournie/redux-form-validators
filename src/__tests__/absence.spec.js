import assert from 'assert'
import Validators, { absence } from '../index'
import getErrorId, { getFormatMessage } from './helper'

const ERROR_ID = 'form.errors.absence'

function test (value) {
  return getErrorId(absence()(value))
}

describe('Validator: absence', function () {
  it('should be invalid when `value` is not empty', function() {
    assert.equal(ERROR_ID, test(1))
    assert.equal(ERROR_ID, test('str'))
    assert.equal(ERROR_ID, test(' abc '))
    assert.equal(ERROR_ID, test(new File()))
    assert.equal(ERROR_ID, test(new FileList({ length: 1 })))
    assert.equal(ERROR_ID, test(new FileList([{}])))
  })
  it('should be valid when `value` is empty', function() {
    assert.ok(!test())
    assert.ok(!test(''))
    assert.ok(!test('   '))
    assert.ok(!test(' \n \t '))
    assert.ok(!test(new FileList()))
    assert.ok(!test(new FileList([])))
    assert.ok(!test(new FileList({ length: 0 })))
  })
  it('should use formatMessage', function() {
    let defaultValue = Validators.getFormatMessage()

    Validators.setFormatMessage(function(msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    })
    assert.equal(ERROR_ID + '2', test(1))

    Validators.setFormatMessage(defaultValue);
  })
})
