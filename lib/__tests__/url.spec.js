'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_ID = 'form.errors.url';

function test(value, params) {
  return (0, _helper2.default)((0, _index.url)(params)(value));
}

describe('Validator: url', function () {
  it('should be invalid when `value` is not a valid url', function () {
    _assert2.default.equal(ERROR_ID, test(''));
    _assert2.default.equal(ERROR_ID, test('http:/:/'));
    _assert2.default.equal(ERROR_ID, test('htpp:/www.google.com'));
    _assert2.default.equal(ERROR_ID, test('ftp//ft.com'));
  });
  it('should be valid when `value` is a valid url', function () {
    _assert2.default.ok(!test('http://google.com'));
    _assert2.default.ok(!test('https://www.google.com'));
    _assert2.default.ok(!test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar'));
  });
  it('should be invalid if the protocols don\'t match', function () {
    _assert2.default.equal(ERROR_ID, test('http://google.com', { protocol: 'ftp' }));
    _assert2.default.equal(ERROR_ID, test('http://google.com', { protocol: ['ftp', 'https'] }));
    _assert2.default.equal(ERROR_ID, test('http://google.com', { protocols: 'https' }));
    _assert2.default.equal(ERROR_ID, test('http://google.com', { protocols: ['ftp', 'https'] }));
    _assert2.default.equal(ERROR_ID, test('https://www.google.com', { protocol: 'ftp' }));
    _assert2.default.equal(ERROR_ID, test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar', { protocol: 'http' }));
  });
  it('should only be valid with certain protocols', function () {
    _assert2.default.ok(!test('http://google.com', { protocol: 'http' }));
    _assert2.default.ok(!test('http://google.com', { protocol: ['http', 'https'] }));
    _assert2.default.ok(!test('http://google.com', { protocol: ['ftp', 'http', 'https'] }));
    _assert2.default.ok(!test('http://google.com', { protocols: 'http' }));
    _assert2.default.ok(!test('http://google.com', { protocols: ['ftp', 'http', 'https'] }));
    _assert2.default.ok(!test('https://www.google.com', { protocol: 'https' }));
    _assert2.default.ok(!test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar', { protocol: 'ftp' }));
  });
});