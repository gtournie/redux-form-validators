import assert from 'assert'
import Validators, { numericality } from '../index'
import getErrorId from './helper'

const ERROR_NOT_A_NUMBER_ID = 'form.errors.notANumber'
const ERROR_NOT_AN_INTEGER_ID = 'form.errors.notAnInteger'
const ERROR_EQUAL_TO_ID = 'form.errors.equalTo'
const ERROR_OTHER_THAN_ID = 'form.errors.otherThan'
const ERROR_GREATER_THAN_ID = 'form.errors.greaterThan'
const ERROR_GREATER_THAN_OR_EQ_ID = 'form.errors.greaterThanOrEqualTo'
const ERROR_LESS_THAN_ID = 'form.errors.lessThan'
const ERROR_LESS_THAN_OR_EQ_ID = 'form.errors.lessThanOrEqualTo'
const ERROR_EVEN_ID = 'form.errors.even'
const ERROR_ODD_ID = 'form.errors.odd'

function test (value, params) {
  return getErrorId(numericality(params)(value))
}

describe('Validator: numericality', function () {
  it('should be invalid when `value` is not a number', function () {
    assert.strictEqual(ERROR_NOT_A_NUMBER_ID, test(''))
    assert.strictEqual(ERROR_NOT_A_NUMBER_ID, test(null))
    assert.strictEqual(ERROR_NOT_A_NUMBER_ID, test('foobar'))
    assert.strictEqual(ERROR_NOT_A_NUMBER_ID, test('12foobar'))
    assert.strictEqual(ERROR_NOT_A_NUMBER_ID, test('foobar12'))
  })
  it('should be invalid when `value` is not a integer', function () {
    assert.strictEqual(ERROR_NOT_A_NUMBER_ID, test('', { int: true }))
    assert.strictEqual(ERROR_NOT_A_NUMBER_ID, test('foobar', { int: true }))
    assert.strictEqual(ERROR_NOT_AN_INTEGER_ID, test('12.345', { int: true }))
    assert.strictEqual(ERROR_NOT_AN_INTEGER_ID, test('0.01', { integer: true }))
  })
  it('should be invalid when `value` is not = to equalTo', function () {
    assert.strictEqual(ERROR_EQUAL_TO_ID, test(1, { '=': 0 }))
    assert.strictEqual(ERROR_EQUAL_TO_ID, test('1', { '=': 0 }))
    assert.strictEqual(ERROR_EQUAL_TO_ID, test('18', { '=': 12 }))
    assert.strictEqual(ERROR_EQUAL_TO_ID, test('12.345', { '=': 12.34 }))
    assert.strictEqual(ERROR_EQUAL_TO_ID, test('0.01', { equalTo: '12.34' }))
  })
  it('should be invalid when `value` is = to otherThan', function () {
    assert.strictEqual(ERROR_OTHER_THAN_ID, test(1, { '!=': 1 }))
    assert.strictEqual(ERROR_OTHER_THAN_ID, test('1', { '!=': 1 }))
    assert.strictEqual(ERROR_OTHER_THAN_ID, test('18', { '!=': 18 }))
    assert.strictEqual(ERROR_OTHER_THAN_ID, test('12.345', { '!=': 12.345 }))
    assert.strictEqual(ERROR_OTHER_THAN_ID, test('0.01', { otherThan: '0.01' }))
  })
  it('should be invalid when `value` is not > to greaterThan', function () {
    assert.strictEqual(ERROR_GREATER_THAN_ID, test(-1, { '>': 0 }))
    assert.strictEqual(ERROR_GREATER_THAN_ID, test('0', { '>': 0 }))
    assert.strictEqual(ERROR_GREATER_THAN_ID, test('12', { '>': 12 }))
    assert.strictEqual(ERROR_GREATER_THAN_ID, test('12.34', { '>': 12.34 }))
    assert.strictEqual(ERROR_GREATER_THAN_ID, test('11.34', { greaterThan: '12.34' }))
  })
  it('should be invalid when `value` is not >= to greaterThanOrEqualTo', function () {
    assert.strictEqual(ERROR_GREATER_THAN_OR_EQ_ID, test(-1, { '>=': 0 }))
    assert.strictEqual(ERROR_GREATER_THAN_OR_EQ_ID, test('-0.01', { '>=': 0 }))
    assert.strictEqual(ERROR_GREATER_THAN_OR_EQ_ID, test('11.9', { '>=': 12 }))
    assert.strictEqual(ERROR_GREATER_THAN_OR_EQ_ID, test('12.339', { '>=': 12.34 }))
    assert.strictEqual(ERROR_GREATER_THAN_OR_EQ_ID, test('12.339', { greaterThanOrEqualTo: '12.34' }))
  })
  it('should be invalid when `value` is not < to lessThan', function () {
    assert.strictEqual(ERROR_LESS_THAN_ID, test(1, { '<': 0 }))
    assert.strictEqual(ERROR_LESS_THAN_ID, test('0', { '<': 0 }))
    assert.strictEqual(ERROR_LESS_THAN_ID, test('12', { '<': 12 }))
    assert.strictEqual(ERROR_LESS_THAN_ID, test('12.34', { '<': 12.34 }))
    assert.strictEqual(ERROR_LESS_THAN_ID, test('13.34', { lessThan: '12.34' }))
  })
  it('should be invalid when `value` is not <= to lessThanOrEqualTo', function () {
    assert.strictEqual(ERROR_LESS_THAN_OR_EQ_ID, test(1, { '<=': 0 }))
    assert.strictEqual(ERROR_LESS_THAN_OR_EQ_ID, test('0.01', { '<=': 0 }))
    assert.strictEqual(ERROR_LESS_THAN_OR_EQ_ID, test('12.1', { '<=': 12 }))
    assert.strictEqual(ERROR_LESS_THAN_OR_EQ_ID, test('12.341', { '<=': 12.34 }))
    assert.strictEqual(ERROR_LESS_THAN_OR_EQ_ID, test('13.34', { lessThanOrEqualTo: '12.34' }))
  })
  it('should be invalid when `value` is not even', function () {
    assert.strictEqual(ERROR_EVEN_ID, test('1', { even: true }))
    assert.strictEqual(ERROR_EVEN_ID, test('3', { even: true }))
    assert.strictEqual(ERROR_EVEN_ID, test('-1', { even: true }))
    assert.strictEqual(ERROR_EVEN_ID, test('15.9', { even: true }))
  })
  it('should be invalid when `value` is not odd', function () {
    assert.strictEqual(ERROR_ODD_ID, test('2', { odd: true }))
    assert.strictEqual(ERROR_ODD_ID, test('4', { odd: true }))
    assert.strictEqual(ERROR_ODD_ID, test('-2', { odd: true }))
    assert.strictEqual(ERROR_ODD_ID, test('14.9', { odd: true }))
  })

  it('should be valid when `value` is a number', function () {
    assert.ok(!test(0))
    assert.ok(!test(1))
    assert.ok(!test('12'))
    assert.ok(!test('12.34'))
  })
  it('should be valid when `value` is an integer', function () {
    assert.ok(!test(1, { int: true }))
    assert.ok(!test('1', { int: true }))
    assert.ok(!test('12', { int: true }))
    assert.ok(!test('-3', { integer: true }))
  })
  it('should be valid when `value` is = to equalTo', function () {
    assert.ok(!test(1, { '=': 1 }))
    assert.ok(!test('1', { '=': 1 }))
    assert.ok(!test('12.345', { '=': 12.345 }))
    assert.ok(!test('0.01', { equalTo: 0.01 }))
  })
  it('should be invalid when `value` is != to otherThan', function () {
    assert.ok(!test(1, { '!=': 0 }))
    assert.ok(!test('1', { '!=': 0 }))
    assert.ok(!test('18', { '!=': 12 }))
    assert.ok(!test('12.345', { '!=': 12.34 }))
    assert.ok(!test('0.01', { otherThan: '12.34' }))
  })
  it('should be valid when `value` is > to greaterThan', function () {
    assert.ok(!test(0.01, { '>': 0 }))
    assert.ok(!test('1', { '>': 0 }))
    assert.ok(!test('12.1', { '>': 12 }))
    assert.ok(!test('12.35', { greaterThan: 12.34 }))
  })
  it('should be valid when `value` is >= to greaterThanOrEqualTo', function () {
    assert.ok(!test(0, { '>=': 0 }))
    assert.ok(!test('0', { '>=': 0 }))
    assert.ok(!test('12', { '>=': 12 }))
    assert.ok(!test('12.34', { greaterThanOrEqualTo: 12.34 }))
  })
  it('should be valid when `value` is < to lessThan', function () {
    assert.ok(!test(-1, { '<': 0 }))
    assert.ok(!test('-0.1', { '<': 0 }))
    assert.ok(!test('11', { '<': 12 }))
    assert.ok(!test('12.33', { lessThan: 12.34 }))
  })
  it('should be valid when `value` is <= to lessThanOrEqualTo', function () {
    assert.ok(!test(0, { '<=': 0 }))
    assert.ok(!test('-0.01', { '<=': 0 }))
    assert.ok(!test('11.9', { '<=': 12 }))
    assert.ok(!test('12.34', { lessThanOrEqualTo: 12.34 }))
  })
  it('should be valid when `value` is even', function () {
    assert.ok(!test('0', { even: true }))
    assert.ok(!test('2', { even: true }))
    assert.ok(!test('-2', { even: true }))
    assert.ok(!test('2.3', { even: true }))
    assert.ok(!test('-2.3', { even: true }))
  })
  it('should be valid when `value` is odd', function () {
    assert.ok(!test('1', { odd: true }))
    assert.ok(!test('-1', { odd: true }))
    assert.ok(!test('1.2', { odd: true }))
    assert.ok(!test('-1.2', { odd: true }))
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.strictEqual(ERROR_NOT_A_NUMBER_ID + '2', test('foobar'))
    assert.strictEqual(ERROR_EQUAL_TO_ID + '2', test(1, { '=': 0 }))
    assert.strictEqual(ERROR_OTHER_THAN_ID + '2', test(1, { '!=': 1 }))
    assert.strictEqual(ERROR_GREATER_THAN_ID + '2', test(-1, { '>': 0 }))
    assert.strictEqual(ERROR_GREATER_THAN_OR_EQ_ID + '2', test(-1, { '>=': 0 }))
    assert.strictEqual(ERROR_LESS_THAN_ID + '2', test(1, { '<': 0 }))
    assert.strictEqual(ERROR_LESS_THAN_OR_EQ_ID + '2', test(1, { '<=': 0 }))
    assert.strictEqual(ERROR_EVEN_ID + '2', test('1', { even: true }))
    assert.strictEqual(ERROR_ODD_ID + '2', test('2', { odd: true }))

    Validators.formatMessage = defaultValue
  })
})
