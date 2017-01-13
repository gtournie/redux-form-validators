import assert from 'assert';
import { absence, acceptance, confirmation, email, exclusion,
  format, inclusion, length, numericality, presence, url } from '../index';
import getErrorId from './helper';


function test(key, func, value, params={}, allValues={}) {
  params[key] = 'foobar';
  return getErrorId(func(params)(value, allValues));
}

describe('Validator option: message', function() {
  it('should return a custom message', function() {
    let blank = '';
    ['msg', 'message'].forEach(function(key) {
      assert.equal('foobar', test(key, absence, 'foo'));
      assert.equal('foobar', test(key, acceptance));
      assert.equal('foobar', test(key, confirmation, 'foo', { field: 'bar' }));
      assert.equal('foobar', test(key, email, blank));
      assert.equal('foobar', test(key, exclusion, blank, { in: [blank] }));
      assert.equal('foobar', test(key, format, blank, { with: /^foo$/ }));
      assert.equal('foobar', test(key, inclusion, blank, { in: [] }));
      assert.equal('foobar', test(key, length, blank, { is: 300 }));
      assert.equal('foobar', test(key, numericality, blank));
      assert.equal('foobar', test(key, presence, blank));
      assert.equal('foobar', test(key, url, blank));
    });
  });
});
