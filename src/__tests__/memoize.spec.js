import assert from 'assert'

import Validators, {
  absence,
  acceptance,
  addValidator,
  confirmation,
  date,
  email,
  exclusion,
  file,
  format,
  inclusion,
  length,
  numericality,
  presence,
  url,
  combine
} from '../index'

function test (func, options) {
  // eslint-disable-next-line no-self-compare
  return options ? func(options) === func(Object.assign(options)) : func() === func()
}

let fooValidator = addValidator({
  defaultMessage: { id: 'errors.foo', defaultMessage: 'Foo' },
  validator:
    /* istanbul ignore next */
    function (options, value) {
      return value === 'foo'
    }
})

describe('memoize', function () {
  it('should return the same function when the options are the same', function () {
    assert.ok(test(absence))
    assert.ok(test(absence))
    assert.ok(test(absence, { msg: 'foobar' }))
    assert.ok(test(absence, { message: { id: 'errors.test' } }))
    assert.ok(test(absence, { message: { id: 'errors.test', defaultMessage: 'Test' } }))
    assert.ok(
      test(absence, {
        if:
          /* istanbul ignore next */
          (value, values) => {
            return values.name !== ''
          }
      })
    )
    assert.ok(
      test(absence, {
        unless:
          /* istanbul ignore next */
          (value, values) => {
            return values.name !== ''
          }
      })
    )

    assert.ok(test(acceptance))
    assert.ok(test(acceptance, { accept: '1' }))

    assert.ok(test(confirmation, { caseSensitive: false, field: 'foo' }))

    assert.ok(test(date, { format: 'mm/dd/yyyy', '<': 'today' }))
    assert.ok(test(date, { format: 'jj/mm/aaaa', ymd: 'amj', '<=': new Date() }))
    assert.ok(
      test(date, {
        format: 'jj/mm/aaaa',
        ymd: 'amj',
        '<=':
          /* istanbul ignore next */
          function () {
            return new Date()
          }
      })
    )
    // eslint-disable-next-line no-new-func
    assert.ok(test(date, { format: 'jj/mm/aaaa', ymd: 'amj', '<=': new Function('return new Date()') }))

    assert.ok(test(email))
    assert.ok(test(email, { allowBlank: true }))

    assert.ok(test(exclusion, { within: ['foo'], caseSensitive: true }))
    assert.ok(test(exclusion, { in: 'foo' }))

    assert.ok(test(file))
    assert.ok(test(file, { accept: '.png' }))

    assert.ok(test(format, { without: /\w+/ }))
    assert.ok(test(format, { with: new RegExp('\\w+') }))

    assert.ok(test(inclusion, { within: ['foo'], caseSensitive: true }))
    assert.ok(test(inclusion, { in: 'foo' }))

    assert.ok(test(length, { min: 7, max: 8 }))
    assert.ok(test(length, { in: [6, 8] }))
    assert.ok(test(length, { '=': 0 }))

    assert.ok(test(numericality))
    assert.ok(test(numericality, { int: true }))
    assert.ok(test(numericality, { equalTo: '12.34' }))
    assert.ok(test(numericality, { '>=': 0, even: true }))

    assert.ok(test(presence))

    assert.ok(test(url))
    assert.ok(test(url, { protocol: 'http' }))
    // eslint-disable-next-line no-array-constructor
    assert.ok(test(url, { protocol: new Array('http', 'https') }))

    assert.ok(test(fooValidator))
    assert.ok(test(fooValidator, { allowBlank: true }))
    assert.ok(test(fooValidator, { msg: 'Test' }))
    assert.ok(
      test(fooValidator, {
        if:
          /* istanbul ignore next */
          (value, values) => {
            return false
          }
      })
    )

    assert.strictEqual(combine(presence(), email()), combine(presence(), email()))
    assert.strictEqual(combine(presence(), email()), combine(presence({}), email({})))
    assert.strictEqual(combine(presence(), email()), combine(email(), presence()))
    assert.strictEqual(
      combine(length({ min: 2 }), email(), format({ without: /z/ })),
      combine(email(), length({ min: 2 }), format({ without: /z/ }))
    )
  })

  it('should return the same function when memoize is true', function () {
    assert.ok(test(absence, { memoize: true }))

    let defaultValue = Validators.defaultOptions.memoize
    Validators.defaultOptions.memoize = false
    assert.ok(test(absence, { memoize: true }))
    Validators.defaultOptions.memoize = defaultValue
  })

  it("shouldn't return the same function when memoize is false", function () {
    assert.ok(!test(absence, { memoize: false }))

    let defaultValue = Validators.defaultOptions.memoize
    Validators.defaultOptions.memoize = false
    assert.ok(!test(absence))
    assert.ok(!test(absence, { memoize: false }))
    // eslint-disable-next-line no-self-compare
    assert.ok(combine(presence(), email()) !== combine(presence(), email()))
    assert.ok(combine(presence(), email()) !== combine(presence({}), email({})))
    assert.ok(combine(presence(), email()) !== combine(email(), presence()))
    Validators.defaultOptions.memoize = defaultValue
  })

  it('should use the memoize function', function () {
    let key = ''
    let memoize = options => (key = 'memoKey')
    assert.ok(test(absence, { memoize: memoize }))
    assert.strictEqual(key, 'memoKey')
    assert.ok(absence({ memoize: () => 'memo1' }) !== absence({ memoize: () => 'memo2' }))
    assert.ok(length({ min: 2, memoize: () => 'memo' }) === length({ memoize: () => 'memo' }))

    let defaultValue = Validators.defaultOptions.memoize
    Validators.defaultOptions.memoize = false
    memoize = () => (key = 'memo')
    assert.ok(test(absence, { memoize: memoize }))
    Validators.defaultOptions.memoize = defaultValue
  })

  it('should use the general memoize function', function () {
    let defaultValue = Validators.defaultOptions.memoize

    let key = ''
    Validators.defaultOptions.memoize = () => (key = 'memoKey')
    assert.ok(test(absence))
    assert.strictEqual(key, 'memoKey')
    assert.ok(length({ min: 2 }) === length({ max: 4 }))

    Validators.defaultOptions.memoize = (opts, $super) => $super(opts)
    assert.ok(test(absence))
    assert.ok(test(absence, { memoize: (opts, $super) => $super(opts) }))

    Validators.defaultOptions.memoize = defaultValue
  })

  it("shouldn't use the general memoize function", function () {
    let defaultValue = Validators.defaultOptions.memoize

    let key = ''
    /* istanbul ignore next */
    Validators.defaultOptions.memoize = () => (key = 'memoKey1')
    let memoize = () => (key = 'memoKey2')
    assert.ok(test(absence, { memoize: memoize }))
    assert.strictEqual(key, 'memoKey2')

    Validators.defaultOptions.memoize = defaultValue
  })
})
