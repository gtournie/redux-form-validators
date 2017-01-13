import assert from 'assert';
import { content, email, exclusion, format, inclusion, length, numericality, url } from '../index';
import getErrorId from './helper';

const BLANK_STRINGS = ['', ' ', ' \n \t '];

function test(func, value, params) {
  return getErrorId(func(params)(value)) || '';
}

describe('Validator option: allowBlank', function() {
  it('should be invalid when `value` is blank', function() {
    BLANK_STRINGS.forEach(function(blank) {
      assert.ok(test(content, blank, { inc: 'foo' }).indexOf('form.errors') === 0);
      assert.ok(test(email, blank).indexOf('form.errors') === 0);
      assert.ok(test(exclusion, blank, { in: BLANK_STRINGS }).indexOf('form.errors') === 0);
      assert.ok(test(format, blank, { with: /^foo$/ }).indexOf('form.errors') === 0);
      assert.ok(test(inclusion, blank, { in: [] }).indexOf('form.errors') === 0);
      assert.ok(test(length, blank, { is: 300 }).indexOf('form.errors') === 0);
      assert.ok(test(numericality, blank).indexOf('form.errors') === 0);
      assert.ok(test(url, blank).indexOf('form.errors') === 0);
    });
  });
  it('should be invalid when `value` is blank with allowBlank: true', function() {
    BLANK_STRINGS.forEach(function(blank) {
      assert.ok(!test(content, blank, { inc: 'foo', allowBlank: true }));
      assert.ok(!test(exclusion, blank, { in: BLANK_STRINGS, allowBlank: true }));
      assert.ok(!test(format, blank, { with: /^foo$/, allowBlank: true }));
      assert.ok(!test(inclusion, blank, { in: [], allowBlank: true }));
      assert.ok(!test(length, blank, { is: 300, allowBlank: true }));
      assert.ok(!test(numericality, blank, { allowBlank: true }));
      assert.ok(!test(url, blank, { allowBlank: true, allowBlank: true }));
    });
  });
});
