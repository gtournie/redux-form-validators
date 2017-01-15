'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(key, msg, func, value) {
  var params = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  params[key] = msg;
  return (0, _helper2.default)(func(params)(value));
}

describe('Validator option: message', function () {
  it('should return a custom message', function () {
    var blank = '';
    ['msg', 'message'].forEach(function (key) {
      _assert2.default.equal('foobar', test(key, 'foobar', _index.absence, 'foo'));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.acceptance));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.confirmation, 'foo', { field: 'bar' }));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.email, blank));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.date, blank, { format: 'mm/dd/yyyy' }));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.exclusion, blank, { in: [blank] }));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.format, blank, { with: /^foo$/ }));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.inclusion, blank, { in: [] }));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.length, blank, { is: 300 }));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.numericality, blank));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.presence, blank));
      _assert2.default.equal('foobar', test(key, 'foobar', _index.url, blank));
      _assert2.default.equal('foobar', test(key, { id: 'foobar', defaultMessage: 'foo' }, _index.presence, blank));
    });
  });
});