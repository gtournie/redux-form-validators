import assert from 'assert'
import { date } from '../index'
import getErrorId from './helper'

const ERROR_FORMAT_ID = 'form.errors.dateFormat'
const ERROR_INVALID_ID = 'form.errors.dateInvalid'
const ERROR_RANGE_ID = 'form.errors.dateRange'

function test (value, params) {
  return getErrorId(date(params)(value))
}

describe('Validator: date', function() {
  it('should be invalid', function() {
    assert.equal(ERROR_FORMAT_ID, test('',            { format: 'mm/dd/yyyy' }))
    assert.equal(ERROR_FORMAT_ID, test('12122016',    { format: 'mm/dd/yyyy' }))
    assert.equal(ERROR_FORMAT_ID, test('12-12-2016',  { format: 'mm/dd/yyyy' }))
    assert.equal(ERROR_FORMAT_ID, test('12/12//2016', { format: 'mm/dd/yyyy' }))
    assert.equal(ERROR_FORMAT_ID, test('12/12//16',   { format: 'mm/dd/yyyy' }))
    assert.equal(ERROR_FORMAT_ID, test('12/12//16',   { format: 'mm/dd' }))

    assert.equal(ERROR_INVALID_ID, test('02/29/2015', { format: 'mm/dd/yyyy' }))
    assert.equal(ERROR_INVALID_ID, test('13/20/2015', { format: 'mm/dd/yyyy' }))
    assert.equal(ERROR_INVALID_ID, test('00/10/2015', { format: 'mm/dd/yyyy' }))
    assert.equal(ERROR_INVALID_ID, test('01/00/2015', { format: 'mm/dd/yyyy' }))

    assert.equal(ERROR_RANGE_ID, test('01/01/2017',   { format: 'mm/dd/yyyy', '=': new Date(2017, 0, 2) }))
    assert.equal(ERROR_RANGE_ID, test('01/01/2017',   { format: 'mm/dd/yyyy', '!=': new Date(2017, 0, 1) }))
    assert.equal(ERROR_RANGE_ID, test('01/01/2017',   { format: 'mm/dd/yyyy', '>': new Date(2017, 0) }))
    assert.equal(ERROR_RANGE_ID, test('01/01/0001',   { format: 'mm/dd/yyyy', '>': 'today' }))
    assert.equal(ERROR_RANGE_ID, test('01/01/0001',   { format: 'mm/dd/yyyy', '>': function() { return new Date() } }))
    assert.equal(ERROR_RANGE_ID, test('12/31/2016',   { format: 'mm/dd/yyyy', '>=': new Date(2017, 0) }))
    assert.equal(ERROR_RANGE_ID, test('01/01/2017',   { format: 'mm/dd/yyyy', '<': new Date(2016, 11, 31) }))
    assert.equal(ERROR_RANGE_ID, test('01/02/2017',   { format: 'mm/dd/yyyy', '<=': new Date(2017, 0) }))

    assert.equal(ERROR_RANGE_ID, test('01/01/2018',   { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }))
    assert.equal(ERROR_RANGE_ID, test('01/01/2015',   { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }))
  })
  it('should be valid', function() {
    assert.ok(!test('12/31/2017',  { format: 'mm/dd/yyyy' }))
    assert.ok(!test('02/29/2016',  { format: 'mm/dd/yyyy' }))
    assert.ok(!test('31/12/2017',  { format: 'dd/mm/yyyy' }))
    assert.ok(!test('29/02/2016',  { format: 'dd/mm/yyyy' }))
    assert.ok(!test('0020/0002/002016', { format: 'dddd/mmmm/yyyyyy' }))
    assert.ok(!test('12/12/16',    { format: 'mm/dd/yy' }))
    assert.ok(!test('12/12/80',    { format: 'mm/dd/yy' }))
    assert.ok(!test('2016/01',     { format: 'yyyy/mm' }))

    // not comparable
    assert.ok(!test('2016/01',     { format: 'yyyy/dd', '<': new Date(1000, 0, 1) }))
    assert.ok(!test('12/01',       { format: 'mm/dd', '<': new Date(1000, 0, 1) }))

    assert.ok(!test('29/02/2016',  { format: 'DD/MM/YYYY', ymd: 'YMD' }))
    assert.ok(!test('29/02/2016',  { format: 'jj/mm/aaaa', ymd: 'amj' }))

    let d = new Date()
    let yesterday = ('00' + (d.getMonth() + 1)).slice(-2) + '/' +
        ('00' + (d.getDate() - 1)).slice(-2) + '/' +
        d.getFullYear()

    assert.ok(!test('01/01/2017',  { format: 'mm/dd/yyyy', '=': new Date(2017, 0, 1) }))
    assert.ok(!test('01/01/2017',  { format: 'mm/dd/yyyy', '!=': new Date(2017, 0, 2) }))
    assert.ok(!test('01/02/2017',  { format: 'mm/dd/yyyy', '>': new Date(2017, 0) }))
    assert.ok(!test(yesterday,     { format: 'mm/dd/yyyy', '<': 'today' }))
    assert.ok(!test('01/01/2012',  { format: 'mm/dd/yyyy', '>': function() { return new Date(2000, 0) } }))
    assert.ok(!test('12/31/2016',  { format: 'mm/dd/yyyy', '>=': new Date(2016, 0) }))
    assert.ok(!test('01/01/2016',  { format: 'mm/dd/yyyy', '<': new Date(2016, 11, 31) }))
    assert.ok(!test('01/01/2017',  { format: 'mm/dd/yyyy', '<=': new Date(2017, 0) }))
    assert.ok(!test('06/01/2016',  { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }))
    assert.ok(!test('01/01/2017',  { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }))
  })
})
