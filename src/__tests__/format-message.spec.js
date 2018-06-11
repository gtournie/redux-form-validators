import assert from 'assert'
import Validators from '../validators'

var formatMessage = global.ValidatorsFormatMessage

describe('formatMessage', function () {
  it('should return the default value or id', function () {
    assert.equal('foo', formatMessage({ defaultMessage: 'foo', id: 'bar' }))
    assert.equal('bar', formatMessage({ id: 'bar' }))
  })
  it('should handle FormattedMessage obj', function () {
    assert.equal('foo', formatMessage({ props: { defaultMessage: 'foo', id: 'bar' } }))
  })
  it('should replace the vars', function () {
    assert.equal('foo 1 2', formatMessage({ defaultMessage: 'foo {bar} {foobar}', values: { bar: 1, foobar: 2 } }))
    assert.equal('foo 1', formatMessage({ defaultMessage: 'foo {count, number}', values: { count: 1 } }))
    assert.equal('foo 1', formatMessage({ defaultMessage: 'foo {count}', values: { count: 1 } }))
  })
  it('should pluralize', function () {
    let msg = '{count, number} {count, plural, one {char} other {chars}}'
    assert.equal('0 chars', formatMessage({ defaultMessage: msg, values: { count: 0 } }))
    assert.equal('1 char', formatMessage({ defaultMessage: msg, values: { count: 1 } }))
    assert.equal('9 chars', formatMessage({ defaultMessage: msg, values: { count: 9 } }))
    assert.equal('1 char1 char', formatMessage({ defaultMessage: msg + msg, values: { count: 1 } }))

    msg = '{count, number} {count, plural, one {} other {chars}}'
    assert.equal('1 ', formatMessage({ defaultMessage: msg, values: { count: 1 } }))

    msg = '{count, number} {count, plural, one {one} other {{size, number} chars}}'
    assert.equal('1 one', formatMessage({ defaultMessage: msg, values: { count: 1, size: 28 } }))
    assert.equal('2 28 chars', formatMessage({ defaultMessage: msg, values: { count: 2, size: 28 } }))
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

    assert.equal('other', formatMessage({ defaultMessage: msg, values: { count: 0 } }))
    assert.equal('one', formatMessage({ defaultMessage: msg, values: { count: 1 } }))
    assert.equal('two_three', formatMessage({ defaultMessage: msg, values: { count: 2 } }))
    assert.equal('two_three', formatMessage({ defaultMessage: msg, values: { count: 3 } }))
    assert.equal('four', formatMessage({ defaultMessage: msg, values: { count: 4 } }))
    assert.equal('one', formatMessage({ defaultMessage: msg, values: { count: 5 } }))
    assert.equal('six', formatMessage({ defaultMessage: msg, values: { count: 6 } }))
    assert.equal('one', formatMessage({ defaultMessage: msg, values: { count: 7 } }))
    assert.equal('one', formatMessage({ defaultMessage: msg, values: { count: 8 } }))
    assert.equal('one', formatMessage({ defaultMessage: msg, values: { count: 9 } }))
    assert.equal('one', formatMessage({ defaultMessage: msg, values: { count: 10 } }))

    Validators.pluralRules = defaultPluralRules
  })
})
