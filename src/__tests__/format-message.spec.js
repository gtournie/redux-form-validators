import assert from 'assert'
import Validators from '../validators'

var formatMessage = global.ValidatorsFormatMessage

describe('formatMessage', function () {
  it('should return the default value or id', function () {
    assert.strictEqual('foo', formatMessage({ defaultMessage: 'foo', id: 'bar' }))
    assert.strictEqual('bar', formatMessage({ id: 'bar' }))
  })
  it('should handle FormattedMessage obj', function () {
    assert.strictEqual('foo', formatMessage({ props: { defaultMessage: 'foo', id: 'bar' } }))
  })
  it('should replace the vars', function () {
    assert.strictEqual(
      'foo 1 2',
      formatMessage({ defaultMessage: 'foo {bar} {foobar}', values: { bar: 1, foobar: 2 } })
    )
    assert.strictEqual('foo 1', formatMessage({ defaultMessage: 'foo {count, number}', values: { count: 1 } }))
    assert.strictEqual('foo 1', formatMessage({ defaultMessage: 'foo {count}', values: { count: 1 } }))
  })
  it('should pluralize', function () {
    let msg = '{count, number} {count, plural, one {char} other {chars}}'
    assert.strictEqual('0 chars', formatMessage({ defaultMessage: msg, values: { count: 0 } }))
    assert.strictEqual('1 char', formatMessage({ defaultMessage: msg, values: { count: 1 } }))
    assert.strictEqual('9 chars', formatMessage({ defaultMessage: msg, values: { count: 9 } }))
    assert.strictEqual('1 char1 char', formatMessage({ defaultMessage: msg + msg, values: { count: 1 } }))

    msg = '{count, number} {count, plural, one {} other {chars}}'
    assert.strictEqual('1 ', formatMessage({ defaultMessage: msg, values: { count: 1 } }))

    msg = '{count, number} {count, plural, one {one} other {{size, number} chars}}'
    assert.strictEqual('1 one', formatMessage({ defaultMessage: msg, values: { count: 1, size: 28 } }))
    assert.strictEqual('2 28 chars', formatMessage({ defaultMessage: msg, values: { count: 2, size: 28 } }))
  })
  it("doesn't know how to pluralize", function () {
    let msg = '{count, number} {count, plural, one {} other {chars}}'
    assert.strictEqual(' chars', formatMessage({ defaultMessage: msg, values: {} }))
  })
  it('should pluralize with given pluralRules', function () {
    let defaultPluralRules = Validators.pluralRules

    Validators.pluralRules = {
      1: 'one',
      5: 'one',
      7: 'one',
      8: 'one',
      9: 'one',
      10: 'one',
      2: 'two',
      3: 'two',
      4: 'few',
      6: 'many'
    }
    let msg = '{count, plural, one {one} two {two_three} few {four} many {six} other {other}}'

    assert.strictEqual('other', formatMessage({ defaultMessage: msg, values: { count: 0 } }))
    assert.strictEqual('one', formatMessage({ defaultMessage: msg, values: { count: 1 } }))
    assert.strictEqual('two_three', formatMessage({ defaultMessage: msg, values: { count: 2 } }))
    assert.strictEqual('two_three', formatMessage({ defaultMessage: msg, values: { count: 3 } }))
    assert.strictEqual('four', formatMessage({ defaultMessage: msg, values: { count: 4 } }))
    assert.strictEqual('one', formatMessage({ defaultMessage: msg, values: { count: 5 } }))
    assert.strictEqual('six', formatMessage({ defaultMessage: msg, values: { count: 6 } }))
    assert.strictEqual('one', formatMessage({ defaultMessage: msg, values: { count: 7 } }))
    assert.strictEqual('one', formatMessage({ defaultMessage: msg, values: { count: 8 } }))
    assert.strictEqual('one', formatMessage({ defaultMessage: msg, values: { count: 9 } }))
    assert.strictEqual('one', formatMessage({ defaultMessage: msg, values: { count: 10 } }))

    Validators.pluralRules = defaultPluralRules
  })
})
