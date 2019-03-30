import assert from 'assert'
import Validators, { date } from '../index'
import getErrorId from './helper'

const ERROR_FORMAT_ID = 'form.errors.dateFormat'
const ERROR_INVALID_ID = 'form.errors.dateInvalid'
const ERROR_RANGE_ID = 'form.errors.dateRange'

const parseDate = date.parseDate
const formatDate = date.formatDate

function test (value, params) {
  return getErrorId(date(params)(value))
}

function testParse (date, strDate, format, ymd) {
  let t = parseDate(strDate, format, ymd).getTime()
  // eslint-disable-next-line no-self-compare
  return date ? date.getTime() === t : t !== t // "t !== t" => invalid date (getTime returns NaN)
}

function testFormat (strDate, date, format, ymd) {
  // eslint-disable-next-line eqeqeq
  return strDate == formatDate(date, format, ymd)
}

describe('Validator: date', function () {
  it('should be invalid', function () {
    assert.strictEqual(ERROR_FORMAT_ID, test('', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_FORMAT_ID, test('12122016', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_FORMAT_ID, test('12-12-2016', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_FORMAT_ID, test('12/12//2016', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_FORMAT_ID, test('12/12//16', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_FORMAT_ID, test('12/12//16', { format: 'mm/dd' }))

    assert.strictEqual(ERROR_INVALID_ID, test('02/29/2015', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_INVALID_ID, test('13/20/2015', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_INVALID_ID, test('00/10/2015', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_INVALID_ID, test('01/00/2015', { format: 'mm/dd/yyyy' }))

    assert.strictEqual(ERROR_RANGE_ID, test('01/01/2017', { format: 'mm/dd/yyyy', '=': new Date(2017, 0, 2) }))
    assert.strictEqual(ERROR_RANGE_ID, test('01/01/2017', { format: 'mm/dd/yyyy', '!=': new Date(2017, 0, 1) }))
    assert.strictEqual(ERROR_RANGE_ID, test('01/01/2017', { format: 'mm/dd/yyyy', '>': new Date(2017, 0) }))
    assert.strictEqual(ERROR_RANGE_ID, test('01/01/0001', { format: 'mm/dd/yyyy', '>': 'today' }))
    assert.strictEqual(
      ERROR_RANGE_ID,
      test('01/01/0001', {
        format: 'mm/dd/yyyy',
        '>': function () {
          return new Date()
        }
      })
    )
    assert.strictEqual(ERROR_RANGE_ID, test('12/31/2016', { format: 'mm/dd/yyyy', '>=': new Date(2017, 0) }))
    assert.strictEqual(ERROR_RANGE_ID, test('01/01/2017', { format: 'mm/dd/yyyy', '<': new Date(2016, 11, 31) }))
    assert.strictEqual(ERROR_RANGE_ID, test('01/02/2017', { format: 'mm/dd/yyyy', '<=': new Date(2017, 0) }))

    assert.strictEqual(
      ERROR_RANGE_ID,
      test('01/01/2018', { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) })
    )
    assert.strictEqual(
      ERROR_RANGE_ID,
      test('01/01/2015', { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) })
    )
  })
  it('should be valid', function () {
    assert.ok(!test('12/31/2017', { format: 'mm/dd/yyyy' }))
    assert.ok(!test('02/29/2016', { format: 'mm/dd/yyyy' }))
    assert.ok(!test('31/12/2017', { format: 'dd/mm/yyyy' }))
    assert.ok(!test('29/02/2016', { format: 'dd/mm/yyyy' }))
    assert.ok(!test('0020/0002/002016', { format: 'dddd/mmmm/yyyyyy' }))
    assert.ok(!test('12/12/16', { format: 'mm/dd/yy' }))
    assert.ok(!test('12/12/80', { format: 'mm/dd/yy' }))
    assert.ok(!test('2016/01', { format: 'yyyy/mm' }))

    // not comparable
    assert.ok(!test('2016/01', { format: 'yyyy/dd', '<': new Date(1000, 0, 1) }))
    assert.ok(!test('12/01', { format: 'mm/dd', '<': new Date(1000, 0, 1) }))

    assert.ok(!test('29/02/2016', { format: 'DD/MM/YYYY', ymd: 'YMD' }))
    assert.ok(!test('29/02/2016', { format: 'jj/mm/aaaa', ymd: 'amj' }))

    let d = new Date()
    d.setDate(d.getDate() - 1)
    let yesterday = ('00' + (d.getMonth() + 1)).slice(-2) + '/' + ('00' + d.getDate()).slice(-2) + '/' + d.getFullYear()

    assert.ok(!test('01/01/2017', { format: 'mm/dd/yyyy', '=': new Date(2017, 0, 1) }))
    assert.ok(!test('01/01/2017', { format: 'mm/dd/yyyy', '!=': new Date(2017, 0, 2) }))
    assert.ok(!test('01/02/2017', { format: 'mm/dd/yyyy', '>': new Date(2017, 0) }))
    assert.ok(!test(yesterday, { format: 'mm/dd/yyyy', '<': 'today' }))
    assert.ok(
      !test('01/01/2012', {
        format: 'mm/dd/yyyy',
        '>': function () {
          return new Date(2000, 0)
        }
      })
    )
    assert.ok(!test('12/31/2016', { format: 'mm/dd/yyyy', '>=': new Date(2016, 0) }))
    assert.ok(!test('01/01/2016', { format: 'mm/dd/yyyy', '<': new Date(2016, 11, 31) }))
    assert.ok(!test('01/01/2017', { format: 'mm/dd/yyyy', '<=': new Date(2017, 0) }))
    assert.ok(!test('06/01/2016', { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }))
    assert.ok(!test('01/01/2017', { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }))
  })
})

describe('parse date', function () {
  it('should be valid', function () {
    assert.ok(testParse(new Date(2017, 11, 31), '12/31/2017', 'mm/dd/yyyy'))
    assert.ok(testParse(new Date(2016, 1, 29), '02/29/2016', 'mm/dd/yyyy'))
    assert.ok(testParse(new Date(2017, 11, 31), '31/12/2017', 'dd/mm/yyyy'))
    assert.ok(testParse(new Date(2016, 1, 29), '29/02/2016', 'dd/mm/yyyy'))
    assert.ok(testParse(new Date(2016, 1, 20), '0020/0002/002016', 'dddd/mmmm/yyyyyy'))
    assert.ok(testParse(new Date(2016, 11, 12), '12/12/16', 'mm/dd/yy'))
    assert.ok(testParse(new Date(1980, 11, 12), '12/12/80', 'mm/dd/yy'))
    assert.ok(testParse(new Date(2016, 0, 1), '2016/01', 'yyyy/mm'))
    assert.ok(testParse(new Date(2016, 0, 1), '2016/01', 'yyyy/dd'))
    assert.ok(testParse(new Date(1970, 11, 1), '12/01', 'mm/dd'))

    assert.ok(testParse(new Date(2017, 11, 31), '12/31/2017', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(new Date(2016, 1, 29), '02/29/2016', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(new Date(2017, 11, 31), '31/12/2017', 'jj/xx/aaaa', 'axj'))
    assert.ok(testParse(new Date(2016, 1, 29), '29/02/2016', 'jj/xx/aaaa', 'axj'))
    assert.ok(testParse(new Date(2016, 1, 20), '0020/0002/002016', 'jjjj/xxxx/aaaaaa', 'axj'))
    assert.ok(testParse(new Date(2016, 11, 12), '12/12/16', 'xx/jj/aa', 'axj'))
    assert.ok(testParse(new Date(1980, 11, 12), '12/12/80', 'xx/jj/aa', 'axj'))
    assert.ok(testParse(new Date(2016, 0, 1), '2016/01', 'aaaa/xx', 'axj'))
    assert.ok(testParse(new Date(2016, 0, 1), '2016/01', 'aaaa/jj', 'axj'))
    assert.ok(testParse(new Date(1970, 11, 1), '12/01', 'xx/jj', 'axj'))
  })
  it('should be invalid', function () {
    assert.ok(testParse(null, '', 'mm/dd/yyyy'))
    assert.ok(testParse(null, '12122016', 'mm/dd/yyyy'))
    assert.ok(testParse(null, '12-12-2016', 'mm/dd/yyyy'))
    assert.ok(testParse(null, '12/12//2016', 'mm/dd/yyyy'))
    assert.ok(testParse(null, '12/12//16', 'mm/dd/yyyy'))
    assert.ok(testParse(null, '12/12//16', 'mm/dd'))
    assert.ok(testParse(null, '02/29/2015', 'mm/dd/yyyy'))
    assert.ok(testParse(null, '13/20/2015', 'mm/dd/yyyy'))
    assert.ok(testParse(null, '00/10/2015', 'mm/dd/yyyy'))
    assert.ok(testParse(null, '01/00/2015', 'mm/dd/yyyy'))

    assert.ok(testParse(null, '', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(null, '12122016', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(null, '12-12-2016', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(null, '12/12//2016', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(null, '12/12//16', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(null, '12/12//16', 'xx/jj', 'axj'))
    assert.ok(testParse(null, '02/29/2015', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(null, '13/20/2015', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(null, '00/10/2015', 'xx/jj/aaaa', 'axj'))
    assert.ok(testParse(null, '01/00/2015', 'xx/jj/aaaa', 'axj'))
  })
})

describe('format date', function () {
  it('should be valid', function () {
    assert.ok(testFormat('', new Date(2017, 11, 31), ''))
    assert.ok(testFormat('12/31/2017', new Date(2017, 11, 31), 'mm/dd/yyyy'))
    assert.ok(testFormat('02/29/2016', new Date(2016, 1, 29), 'mm/dd/yyyy'))
    assert.ok(testFormat('31/12/2017', new Date(2017, 11, 31), 'dd/mm/yyyy'))
    assert.ok(testFormat('29/02/2016', new Date(2016, 1, 29), 'dd/mm/yyyy'))
    assert.ok(testFormat('0020/0002/002016', new Date(2016, 1, 20), 'dddd/mmmm/yyyyyy'))
    assert.ok(testFormat('12/12/16', new Date(2016, 11, 12), 'mm/dd/yy'))
    assert.ok(testFormat('12/12/80', new Date(1980, 11, 12), 'mm/dd/yy'))
    assert.ok(testFormat('2016/01', new Date(2016, 0, 1), 'yyyy/mm'))
    assert.ok(testFormat('1601', new Date(2016, 0, 1), 'yymm'))
    assert.ok(testFormat('0116', new Date(2016, 0, 1), 'mmyy'))
    assert.ok(testFormat('2016/01', new Date(2016, 0, 1), 'yyyy/dd'))
    assert.ok(testFormat('12/01', new Date(1970, 11, 1), 'mm/dd'))

    assert.ok(testFormat('', new Date(2017, 11, 31), '', 'axj'))
    assert.ok(testFormat('12/31/2017', new Date(2017, 11, 31), 'xx/jj/aaaa', 'axj'))
    assert.ok(testFormat('02/29/2016', new Date(2016, 1, 29), 'xx/jj/aaaa', 'axj'))
    assert.ok(testFormat('31/12/2017', new Date(2017, 11, 31), 'jj/xx/aaaa', 'axj'))
    assert.ok(testFormat('29/02/2016', new Date(2016, 1, 29), 'jj/xx/aaaa', 'axj'))
    assert.ok(testFormat('0020/0002/002016', new Date(2016, 1, 20), 'jjjj/xxxx/aaaaaa', 'axj'))
    assert.ok(testFormat('12/12/16', new Date(2016, 11, 12), 'xx/jj/aa', 'axj'))
    assert.ok(testFormat('12/12/80', new Date(1980, 11, 12), 'xx/jj/aa', 'axj'))
    assert.ok(testFormat('2016/01', new Date(2016, 0, 1), 'aaaa/xx', 'axj'))
    assert.ok(testFormat('1601', new Date(2016, 0, 1), 'yymm', 'axj'))
    assert.ok(testFormat('0116', new Date(2016, 0, 1), 'mmyy', 'axj'))
    assert.ok(testFormat('2016/01', new Date(2016, 0, 1), 'aaaa/jj', 'axj'))
    assert.ok(testFormat('12/01', new Date(1970, 11, 1), 'xx/jj', 'axj'))
  })
  it('should be invalid', function () {
    assert.ok(testFormat(null, new Date(NaN), ''))
    assert.ok(testFormat(null, new Date(NaN), 'mm/dd/yyyy'))
    assert.ok(testFormat(null, null, 'mm/dd/yyyy'))
    assert.ok(testFormat(null, 0, 'mm/dd/yyyy'))
    assert.ok(testFormat(null, 'new date', 'mm/dd/yyyy'))
    assert.ok(testFormat(null, {}, 'mm/dd/yyyy'))

    assert.ok(testFormat(null, new Date(NaN), '', 'axj'))
    assert.ok(testFormat(null, new Date(NaN), 'xx/jj/aaaa', 'axj'))
  })
  it('should use default dateFormat option', function () {
    let defaultValue = Validators.defaultOptions.dateFormat

    Validators.defaultOptions.dateFormat = 'mm/dd/yyyy'
    assert.ok(!test('12/31/2017'))

    Validators.defaultOptions.dateFormat = 'yyyy/mm/dd'
    assert.ok(!test('2017/12/31'))

    Validators.defaultOptions.dateFormat = defaultValue
  })
  it('should use default dateYmd option', function () {
    let defaultValue = Validators.defaultOptions.dateYmd

    Validators.defaultOptions.dateYmd = 'xyz'
    assert.ok(!test('12/31/2017', { format: 'yy/zz/xxxx' }))

    Validators.defaultOptions.dateYmd = 'dym'
    assert.ok(!test('12/31/2017', { format: 'yy/mm/dddd' }))

    Validators.defaultOptions.dateYmd = defaultValue
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.strictEqual(ERROR_FORMAT_ID + '2', test('', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_INVALID_ID + '2', test('01/00/2015', { format: 'mm/dd/yyyy' }))
    assert.strictEqual(ERROR_RANGE_ID + '2', test('01/01/2017', { format: 'mm/dd/yyyy', '=': new Date(2017, 0, 2) }))

    Validators.formatMessage = defaultValue
  })
})
