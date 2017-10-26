import assert from 'assert'
import { formatMsg } from '../helpers'


describe('formatMessage', function() {
  it('should return the default value or id', function() {
    assert.equal('foo', formatMsg({ defaultMessage: 'foo', id: 'bar' }))
    assert.equal('bar', formatMsg({ id: 'bar' }))
  })
  it('should handle FormattedMessage obj', function() {
    assert.equal('foo', formatMsg({ props: { defaultMessage: 'foo', id: 'bar' } }))
  })
  it('should replace the vars', function() {
    assert.equal('foo 1 2', formatMsg({ defaultMessage: 'foo {bar} {foobar}', values: { bar: 1, foobar: 2 } }))
    assert.equal('foo 1', formatMsg({ defaultMessage: 'foo {count, number}', values: { count: 1 } }))
    assert.equal('foo 1', formatMsg({ defaultMessage: 'foo {count}', values: { count: 1 } }))
  })
  it('should pluralize', function() {
    let msg = '{count, number} {count, plural, one {char} other {chars}}'
    assert.equal('0 chars', formatMsg({ defaultMessage: msg, values: { count: 0 } }))
    assert.equal('1 char', formatMsg({ defaultMessage: msg, values: { count: 1 } }))
    assert.equal('9 chars', formatMsg({ defaultMessage: msg, values: { count: 9 } }))
    assert.equal('1 char1 char', formatMsg({ defaultMessage: msg + msg, values: { count: 1 } }))
  })
})
