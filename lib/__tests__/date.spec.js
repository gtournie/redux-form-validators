'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_FORMAT_ID = 'form.errors.dateFormat';
var ERROR_INVALID_ID = 'form.errors.dateInvalid';
var ERROR_RANGE_ID = 'form.errors.dateRange';

function test(value, params) {
  return (0, _helper2.default)((0, _index.date)(params)(value));
}

describe('Validator: date', function () {
  it('should be invalid', function () {
    _assert2.default.equal(ERROR_FORMAT_ID, test('', { format: 'mm/dd/yyyy' }));
    _assert2.default.equal(ERROR_FORMAT_ID, test('12122016', { format: 'mm/dd/yyyy' }));
    _assert2.default.equal(ERROR_FORMAT_ID, test('12-12-2016', { format: 'mm/dd/yyyy' }));
    _assert2.default.equal(ERROR_FORMAT_ID, test('12/12//2016', { format: 'mm/dd/yyyy' }));
    _assert2.default.equal(ERROR_FORMAT_ID, test('12/12//16', { format: 'mm/dd/yyyy' }));
    _assert2.default.equal(ERROR_FORMAT_ID, test('12/12//16', { format: 'mm/dd' }));

    _assert2.default.equal(ERROR_INVALID_ID, test('02/29/2015', { format: 'mm/dd/yyyy' }));
    _assert2.default.equal(ERROR_INVALID_ID, test('13/20/2015', { format: 'mm/dd/yyyy' }));
    _assert2.default.equal(ERROR_INVALID_ID, test('00/10/2015', { format: 'mm/dd/yyyy' }));
    _assert2.default.equal(ERROR_INVALID_ID, test('01/00/2015', { format: 'mm/dd/yyyy' }));

    _assert2.default.equal(ERROR_RANGE_ID, test('01/01/2017', { format: 'mm/dd/yyyy', '=': new Date(2017, 0, 2) }));
    _assert2.default.equal(ERROR_RANGE_ID, test('01/01/2017', { format: 'mm/dd/yyyy', '!=': new Date(2017, 0, 1) }));
    _assert2.default.equal(ERROR_RANGE_ID, test('01/01/2017', { format: 'mm/dd/yyyy', '>': new Date(2017, 0) }));
    _assert2.default.equal(ERROR_RANGE_ID, test('01/01/0001', { format: 'mm/dd/yyyy', '>': 'today' }));
    _assert2.default.equal(ERROR_RANGE_ID, test('01/01/0001', { format: 'mm/dd/yyyy', '>': function _() {
        return new Date();
      } }));
    _assert2.default.equal(ERROR_RANGE_ID, test('12/31/2016', { format: 'mm/dd/yyyy', '>=': new Date(2017, 0) }));
    _assert2.default.equal(ERROR_RANGE_ID, test('01/01/2017', { format: 'mm/dd/yyyy', '<': new Date(2016, 11, 31) }));
    _assert2.default.equal(ERROR_RANGE_ID, test('01/02/2017', { format: 'mm/dd/yyyy', '<=': new Date(2017, 0) }));

    _assert2.default.equal(ERROR_RANGE_ID, test('01/01/2018', { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }));
    _assert2.default.equal(ERROR_RANGE_ID, test('01/01/2015', { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }));
  });
  it('should be valid', function () {
    _assert2.default.ok(!test('12/31/2017', { format: 'mm/dd/yyyy' }));
    _assert2.default.ok(!test('02/29/2016', { format: 'mm/dd/yyyy' }));
    _assert2.default.ok(!test('31/12/2017', { format: 'dd/mm/yyyy' }));
    _assert2.default.ok(!test('29/02/2016', { format: 'dd/mm/yyyy' }));
    _assert2.default.ok(!test('0020/0002/002016', { format: 'dddd/mmmm/yyyyyy' }));
    _assert2.default.ok(!test('12/12/16', { format: 'mm/dd/yy' }));
    _assert2.default.ok(!test('12/12/80', { format: 'mm/dd/yy' }));
    _assert2.default.ok(!test('2016/01', { format: 'yyyy/mm' }));

    // not comparable
    _assert2.default.ok(!test('2016/01', { format: 'yyyy/dd', '<': new Date(1000, 0, 1) }));
    _assert2.default.ok(!test('12/01', { format: 'mm/dd', '<': new Date(1000, 0, 1) }));

    _assert2.default.ok(!test('29/02/2016', { format: 'DD/MM/YYYY', ymd: 'YMD' }));
    _assert2.default.ok(!test('29/02/2016', { format: 'jj/mm/aaaa', ymd: 'amj' }));

    var d = new Date();
    var yesterday = ('00' + (d.getMonth() + 1)).slice(-2) + '/' + ('00' + (d.getDate() - 1)).slice(-2) + '/' + d.getFullYear();

    _assert2.default.ok(!test('01/01/2017', { format: 'mm/dd/yyyy', '=': new Date(2017, 0, 1) }));
    _assert2.default.ok(!test('01/01/2017', { format: 'mm/dd/yyyy', '!=': new Date(2017, 0, 2) }));
    _assert2.default.ok(!test('01/02/2017', { format: 'mm/dd/yyyy', '>': new Date(2017, 0) }));
    _assert2.default.ok(!test(yesterday, { format: 'mm/dd/yyyy', '<': 'today' }));
    _assert2.default.ok(!test('01/01/2012', { format: 'mm/dd/yyyy', '>': function _() {
        return new Date(2000, 0);
      } }));
    _assert2.default.ok(!test('12/31/2016', { format: 'mm/dd/yyyy', '>=': new Date(2016, 0) }));
    _assert2.default.ok(!test('01/01/2016', { format: 'mm/dd/yyyy', '<': new Date(2016, 11, 31) }));
    _assert2.default.ok(!test('01/01/2017', { format: 'mm/dd/yyyy', '<=': new Date(2017, 0) }));
    _assert2.default.ok(!test('06/01/2016', { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }));
    _assert2.default.ok(!test('01/01/2017', { format: 'mm/dd/yyyy', '>': new Date(2016, 0), '<=': new Date(2017, 0) }));
  });
});