'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(key, func, value) {
  var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var allValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  params[key] = 'foobar';
  return (0, _helper2.default)(func(params)(value, allValues));
}

describe('Validator option: message', function () {
  it('should return a custom message', function () {
    var blank = '';
    ['msg', 'message'].forEach(function (key) {
      _assert2.default.equal('foobar', test(key, _index.absence, 'foo'));
      _assert2.default.equal('foobar', test(key, _index.acceptance));
      _assert2.default.equal('foobar', test(key, _index.confirmation, 'foo', { field: 'bar' }));
      _assert2.default.equal('foobar', test(key, _index.email, blank));
      _assert2.default.equal('foobar', test(key, _index.exclusion, blank, { in: [blank] }));
      _assert2.default.equal('foobar', test(key, _index.format, blank, { with: /^foo$/ }));
      _assert2.default.equal('foobar', test(key, _index.inclusion, blank, { in: [] }));
      _assert2.default.equal('foobar', test(key, _index.length, blank, { is: 300 }));
      _assert2.default.equal('foobar', test(key, _index.numericality, blank));
      _assert2.default.equal('foobar', test(key, _index.presence, blank));
      _assert2.default.equal('foobar', test(key, _index.url, blank));
    });
  });
});