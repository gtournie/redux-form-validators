import assert from 'assert'
import Validators, { email, date, exclusion, file, format, inclusion, length, numericality, url } from '../index'
import getErrorId from './helper'

const BLANK_STRINGS = ['', ' ', ' \n \t ']

function test (func, value, params) {
  return getErrorId(func(params)(value)) || ''
}

describe('Validator option: allowBlank', function () {
  it('should be invalid when `value` is blank', function () {
    BLANK_STRINGS.forEach(function (blank) {
      assert.ok(test(email, blank, { allowBlank: false }).indexOf('form.errors') === 0)
      assert.ok(test(date, blank, { format: 'mm/dd/yyyy', allowBlank: false }).indexOf('form.errors') === 0)
      assert.ok(test(exclusion, blank, { in: BLANK_STRINGS, allowBlank: false }).indexOf('form.errors') === 0)
      assert.ok(test(format, blank, { with: /^foo$/, allowBlank: false }).indexOf('form.errors') === 0)
      assert.ok(test(inclusion, blank, { in: [], allowBlank: false }).indexOf('form.errors') === 0)
      assert.ok(test(length, blank, { is: 300, allowBlank: false }).indexOf('form.errors') === 0)
      assert.ok(test(numericality, blank, { allowBlank: false }).indexOf('form.errors') === 0)
      assert.ok(test(url, blank, { allowBlank: false }).indexOf('form.errors') === 0)
      assert.ok(test(file, blank, { allowBlank: false }).indexOf('form.errors') === 0)
    })
    assert.ok(test(file, new FileList(), { allowBlank: false }).indexOf('form.errors') === 0)
  })
  it('should be valid when `value` is blank with allowBlank: true', function () {
    BLANK_STRINGS.forEach(function (blank) {
      assert.ok(!test(email, blank, { allowBlank: true }))
      assert.ok(!test(date, blank, { format: 'mm/dd/yyyy', allowBlank: true }))
      assert.ok(!test(exclusion, blank, { in: BLANK_STRINGS, allowBlank: true }))
      assert.ok(!test(format, blank, { with: /^foo$/, allowBlank: true }))
      assert.ok(!test(inclusion, blank, { in: [], allowBlank: true }))
      assert.ok(!test(length, blank, { is: 300, allowBlank: true }))
      assert.ok(!test(numericality, blank, { allowBlank: true }))
      assert.ok(!test(url, blank, { allowBlank: true }))
      assert.ok(!test(file, blank, { allowBlank: true }))
    })
    assert.ok(!test(file, new FileList(), { allowBlank: true }))
  })
  it('should use default allowBlank option', function () {
    let defaultValue = Validators.defaultOptions.allowBlank
    ;[true, false].forEach(function (allowBlank) {
      Validators.defaultOptions.allowBlank = allowBlank

      BLANK_STRINGS.forEach(function (blank) {
        assert.ok(allowBlank !== (test(email, blank).indexOf('form.errors') === 0))
        assert.ok(allowBlank !== (test(date, blank, { format: 'mm/dd/yyyy' }).indexOf('form.errors') === 0))
        assert.ok(allowBlank !== (test(exclusion, blank, { in: BLANK_STRINGS }).indexOf('form.errors') === 0))
        assert.ok(allowBlank !== (test(format, blank, { with: /^foo$/ }).indexOf('form.errors') === 0))
        assert.ok(allowBlank !== (test(inclusion, blank, { in: [] }).indexOf('form.errors') === 0))
        assert.ok(allowBlank !== (test(length, blank, { is: 300 }).indexOf('form.errors') === 0))
        assert.ok(allowBlank !== (test(numericality, blank).indexOf('form.errors') === 0))
        assert.ok(allowBlank !== (test(url, blank).indexOf('form.errors') === 0))
        assert.ok(allowBlank !== (test(file, blank).indexOf('form.errors') === 0))
      })
    })

    Validators.defaultOptions.allowBlank = defaultValue
  })
})
