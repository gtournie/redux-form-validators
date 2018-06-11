import assert from 'assert'
import {
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

function test (type, func, value, params = {}, allValues = {}) {
  if (!type || type === 'if') {
    params.if = function (values) {
      return values.foo === 'foo'
    }
    allValues.foo = ''
  }
  if (!type || type === 'unless') {
    params.unless = function (values) {
      return values.bar !== 'bar'
    }
    allValues.bar = ''
  }
  return getErrorId(func(params)(value, allValues))
}

describe('Validator option: if & unless', function () {
  it('should not return an error', function () {
    let blank = ''
    ;['', 'if', 'unless'].forEach(function (type) {
      // All these tests normally return an error
      assert.ok(!test(type, absence, 'foo'))
      assert.ok(!test(type, acceptance))
      assert.ok(!test(type, confirmation, 'foo', { field: 'bar' }, {}))
      assert.ok(!test(type, email, blank))
      assert.ok(!test(type, date, blank, { format: 'mm/dd/yyyy' }))
      assert.ok(!test(type, exclusion, blank, { in: [blank] }))
      assert.ok(!test(type, file, blank, { minFiles: 9 }))
      assert.ok(!test(type, format, blank, { with: /^foo$/ }))
      assert.ok(!test(type, inclusion, blank, { in: [] }))
      assert.ok(!test(type, length, blank, { is: 300 }))
      assert.ok(!test(type, numericality, blank))
      assert.ok(!test(type, presence, blank))
      assert.ok(!test(type, url, blank))
    })
  })
})
