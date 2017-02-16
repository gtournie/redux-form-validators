'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_NOT_A_NUMBER_ID = 'form.errors.notANumber';
var ERROR_EQUAL_TO_ID = 'form.errors.equalTo';
var ERROR_OTHER_THAN_ID = 'form.errors.otherThan';
var ERROR_GREATER_THAN_ID = 'form.errors.greaterThan';
var ERROR_GREATER_THAN_OR_EQ_ID = 'form.errors.greaterThanOrEqualTo';
var ERROR_LESS_THAN_ID = 'form.errors.lessThan';
var ERROR_LESS_THAN_OR_EQ_ID = 'form.errors.lessThanOrEqualTo';
var ERROR_EVEN_ID = 'form.errors.even';
var ERROR_ODD_ID = 'form.errors.odd';

function test(value, params) {
  return (0, _helper2.default)((0, _index.numericality)(params)(value));
}

describe('Validator: numericality', function () {
  it('should be invalid when `value` is not a number', function () {
    _assert2.default.equal(ERROR_NOT_A_NUMBER_ID, test(''));
    _assert2.default.equal(ERROR_NOT_A_NUMBER_ID, test(null));
    _assert2.default.equal(ERROR_NOT_A_NUMBER_ID, test('foobar'));
    _assert2.default.equal(ERROR_NOT_A_NUMBER_ID, test('12foobar'));
    _assert2.default.equal(ERROR_NOT_A_NUMBER_ID, test('foobar12'));
  });
  it('should be invalid when `value` is not a integer', function () {
    _assert2.default.equal(ERROR_NOT_A_NUMBER_ID, test('', { int: true }));
    _assert2.default.equal(ERROR_NOT_A_NUMBER_ID, test('foobar', { int: true }));
    _assert2.default.equal(ERROR_NOT_A_NUMBER_ID, test('12.345', { int: true }));
    _assert2.default.equal(ERROR_NOT_A_NUMBER_ID, test('0.01', { integer: true }));
  });
  it('should be invalid when `value` is not = to equalTo', function () {
    _assert2.default.equal(ERROR_EQUAL_TO_ID, test(1, { '=': 0 }));
    _assert2.default.equal(ERROR_EQUAL_TO_ID, test('1', { '=': 0 }));
    _assert2.default.equal(ERROR_EQUAL_TO_ID, test('18', { '=': 12 }));
    _assert2.default.equal(ERROR_EQUAL_TO_ID, test('12.345', { '=': 12.34 }));
    _assert2.default.equal(ERROR_EQUAL_TO_ID, test('0.01', { 'equalTo': '12.34' }));
  });
  it('should be invalid when `value` is = to otherThan', function () {
    _assert2.default.equal(ERROR_OTHER_THAN_ID, test(1, { '!=': 1 }));
    _assert2.default.equal(ERROR_OTHER_THAN_ID, test('1', { '!=': 1 }));
    _assert2.default.equal(ERROR_OTHER_THAN_ID, test('18', { '!=': 18 }));
    _assert2.default.equal(ERROR_OTHER_THAN_ID, test('12.345', { '!=': 12.345 }));
    _assert2.default.equal(ERROR_OTHER_THAN_ID, test('0.01', { 'otherThan': '0.01' }));
  });
  it('should be invalid when `value` is not > to greaterThan', function () {
    _assert2.default.equal(ERROR_GREATER_THAN_ID, test(-1, { '>': 0 }));
    _assert2.default.equal(ERROR_GREATER_THAN_ID, test('0', { '>': 0 }));
    _assert2.default.equal(ERROR_GREATER_THAN_ID, test('12', { '>': 12 }));
    _assert2.default.equal(ERROR_GREATER_THAN_ID, test('12.34', { '>': 12.34 }));
    _assert2.default.equal(ERROR_GREATER_THAN_ID, test('11.34', { 'greaterThan': '12.34' }));
  });
  it('should be invalid when `value` is not >= to greaterThanOrEqualTo', function () {
    _assert2.default.equal(ERROR_GREATER_THAN_OR_EQ_ID, test(-1, { '>=': 0 }));
    _assert2.default.equal(ERROR_GREATER_THAN_OR_EQ_ID, test('-0.01', { '>=': 0 }));
    _assert2.default.equal(ERROR_GREATER_THAN_OR_EQ_ID, test('11.9', { '>=': 12 }));
    _assert2.default.equal(ERROR_GREATER_THAN_OR_EQ_ID, test('12.339', { '>=': 12.34 }));
    _assert2.default.equal(ERROR_GREATER_THAN_OR_EQ_ID, test('12.339', { 'greaterThanOrEqualTo': '12.34' }));
  });
  it('should be invalid when `value` is not < to lessThan', function () {
    _assert2.default.equal(ERROR_LESS_THAN_ID, test(1, { '<': 0 }));
    _assert2.default.equal(ERROR_LESS_THAN_ID, test('0', { '<': 0 }));
    _assert2.default.equal(ERROR_LESS_THAN_ID, test('12', { '<': 12 }));
    _assert2.default.equal(ERROR_LESS_THAN_ID, test('12.34', { '<': 12.34 }));
    _assert2.default.equal(ERROR_LESS_THAN_ID, test('13.34', { 'lessThan': '12.34' }));
  });
  it('should be invalid when `value` is not <= to lessThanOrEqualTo', function () {
    _assert2.default.equal(ERROR_LESS_THAN_OR_EQ_ID, test(1, { '<=': 0 }));
    _assert2.default.equal(ERROR_LESS_THAN_OR_EQ_ID, test('0.01', { '<=': 0 }));
    _assert2.default.equal(ERROR_LESS_THAN_OR_EQ_ID, test('12.1', { '<=': 12 }));
    _assert2.default.equal(ERROR_LESS_THAN_OR_EQ_ID, test('12.341', { '<=': 12.34 }));
    _assert2.default.equal(ERROR_LESS_THAN_OR_EQ_ID, test('13.34', { 'lessThanOrEqualTo': '12.34' }));
  });
  it('should be invalid when `value` is not even', function () {
    _assert2.default.equal(ERROR_EVEN_ID, test('1', { even: true }));
    _assert2.default.equal(ERROR_EVEN_ID, test('3', { even: true }));
    _assert2.default.equal(ERROR_EVEN_ID, test('-1', { even: true }));
    _assert2.default.equal(ERROR_EVEN_ID, test('15.9', { even: true }));
  });
  it('should be invalid when `value` is not odd', function () {
    _assert2.default.equal(ERROR_ODD_ID, test('2', { odd: true }));
    _assert2.default.equal(ERROR_ODD_ID, test('4', { odd: true }));
    _assert2.default.equal(ERROR_ODD_ID, test('-2', { odd: true }));
    _assert2.default.equal(ERROR_ODD_ID, test('14.9', { odd: true }));
  });

  it('should be valid when `value` is a number', function () {
    _assert2.default.ok(!test(0));
    _assert2.default.ok(!test(1));
    _assert2.default.ok(!test('12'));
    _assert2.default.ok(!test('12.34'));
  });
  it('should be valid when `value` is an integer', function () {
    _assert2.default.ok(!test(1, { int: true }));
    _assert2.default.ok(!test('1', { int: true }));
    _assert2.default.ok(!test('12', { int: true }));
    _assert2.default.ok(!test('-3', { integer: true }));
  });
  it('should be valid when `value` is = to equalTo', function () {
    _assert2.default.ok(!test(1, { '=': 1 }));
    _assert2.default.ok(!test('1', { '=': 1 }));
    _assert2.default.ok(!test('12.345', { '=': 12.345 }));
    _assert2.default.ok(!test('0.01', { 'equalTo': 0.01 }));
  });
  it('should be invalid when `value` is != to otherThan', function () {
    _assert2.default.ok(!test(1, { '!=': 0 }));
    _assert2.default.ok(!test('1', { '!=': 0 }));
    _assert2.default.ok(!test('18', { '!=': 12 }));
    _assert2.default.ok(!test('12.345', { '!=': 12.34 }));
    _assert2.default.ok(!test('0.01', { 'otherThan': '12.34' }));
  });
  it('should be valid when `value` is > to greaterThan', function () {
    _assert2.default.ok(!test(0.01, { '>': 0 }));
    _assert2.default.ok(!test('1', { '>': 0 }));
    _assert2.default.ok(!test('12.1', { '>': 12 }));
    _assert2.default.ok(!test('12.35', { 'greaterThan': 12.34 }));
  });
  it('should be valid when `value` is >= to greaterThanOrEqualTo', function () {
    _assert2.default.ok(!test(0, { '>=': 0 }));
    _assert2.default.ok(!test('0', { '>=': 0 }));
    _assert2.default.ok(!test('12', { '>=': 12 }));
    _assert2.default.ok(!test('12.34', { 'greaterThanOrEqualTo': 12.34 }));
  });
  it('should be valid when `value` is < to lessThan', function () {
    _assert2.default.ok(!test(-1, { '<': 0 }));
    _assert2.default.ok(!test('-0.1', { '<': 0 }));
    _assert2.default.ok(!test('11', { '<': 12 }));
    _assert2.default.ok(!test('12.33', { 'lessThan': 12.34 }));
  });
  it('should be valid when `value` is <= to lessThanOrEqualTo', function () {
    _assert2.default.ok(!test(0, { '<=': 0 }));
    _assert2.default.ok(!test('-0.01', { '<=': 0 }));
    _assert2.default.ok(!test('11.9', { '<=': 12 }));
    _assert2.default.ok(!test('12.34', { 'lessThanOrEqualTo': 12.34 }));
  });
  it('should be valid when `value` is even', function () {
    _assert2.default.ok(!test('0', { even: true }));
    _assert2.default.ok(!test('2', { even: true }));
    _assert2.default.ok(!test('-2', { even: true }));
    _assert2.default.ok(!test('2.3', { even: true }));
    _assert2.default.ok(!test('-2.3', { even: true }));
  });
  it('should be valid when `value` is odd', function () {
    _assert2.default.ok(!test('1', { odd: true }));
    _assert2.default.ok(!test('-1', { odd: true }));
    _assert2.default.ok(!test('1.2', { odd: true }));
    _assert2.default.ok(!test('-1.2', { odd: true }));
  });
});