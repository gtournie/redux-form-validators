'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(type, func, value) {
  var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var allValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  if (!type || 'if' === type) {
    params.if = function (values) {
      return values.foo === 'foo';
    };
    allValues.foo = '';
  }
  if (!type || 'unless' === type) {
    params.unless = function (values) {
      return values.bar !== 'bar';
    };
    allValues.bar = '';
  }
  return (0, _helper2.default)(func(params)(value, allValues));
}

describe('Validator option: if & unless', function () {
  it('should not return an error', function () {
    var blank = '';
    ['', 'if', 'unless'].forEach(function (type) {
      // All these tests normally return an error
      _assert2.default.ok(!test(type, _index.absence, 'foo'));
      _assert2.default.ok(!test(type, _index.acceptance));
      _assert2.default.ok(!test(type, _index.confirmation, 'foo', { field: 'bar' }, {}));
      _assert2.default.ok(!test(type, _index.email, blank));
      _assert2.default.ok(!test(type, _index.date, blank, { format: 'mm/dd/yyyy' }));
      _assert2.default.ok(!test(type, _index.exclusion, blank, { in: [blank] }));
      _assert2.default.ok(!test(type, _index.format, blank, { with: /^foo$/ }));
      _assert2.default.ok(!test(type, _index.inclusion, blank, { in: [] }));
      _assert2.default.ok(!test(type, _index.length, blank, { is: 300 }));
      _assert2.default.ok(!test(type, _index.numericality, blank));
      _assert2.default.ok(!test(type, _index.presence, blank));
      _assert2.default.ok(!test(type, _index.url, blank));
    });
  });
});