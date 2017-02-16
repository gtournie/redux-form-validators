import assert from 'assert'
import { absence, date, acceptance, confirmation, email, exclusion,
  format, inclusion, length, numericality, presence, url } from '../index'
import getErrorId from './helper'


function test (key, msg, func, value, params={}) {
  params[key] = msg
  return getErrorId(func(params)(value))
}

describe('Validator option: message', function() {
  it('should return a custom message', function() {
    let blank = ''
    ;['msg', 'message'].forEach(function(key) {
      assert.equal('foobar', test(key, 'foobar', absence, 'foo'))
      assert.equal('foobar', test(key, 'foobar', acceptance))
      assert.equal('foobar', test(key, 'foobar', confirmation, 'foo', { field: 'bar' }))
      assert.equal('foobar', test(key, 'foobar', email, blank))
      assert.equal('foobar', test(key, 'foobar', date, blank, { format: 'mm/dd/yyyy' }))
      assert.equal('foobar', test(key, 'foobar', exclusion, blank, { in: [blank] }))
      assert.equal('foobar', test(key, 'foobar', format, blank, { with: /^foo$/ }))
      assert.equal('foobar', test(key, 'foobar', inclusion, blank, { in: [] }))
      assert.equal('foobar', test(key, 'foobar', length, blank, { is: 300 }))
      assert.equal('foobar', test(key, 'foobar', numericality, blank))
      assert.equal('foobar', test(key, 'foobar', presence, blank))
      assert.equal('foobar', test(key, 'foobar', url, blank))
      assert.equal('foobar', test(key, { id: 'foobar', defaultMessage: 'foo' }, presence, blank))
    })
  })
})
