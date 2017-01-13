import assert from 'assert';
import { url } from '../index';
import getErrorId from './helper';

const ERROR_ID = 'form.errors.url';

function test(value, params) {
  return getErrorId(url(params)(value));
}

describe('Validator: url', function() {
  it('should be invalid when `value` is not a valid url', function() {
    assert.equal(ERROR_ID, test(''));
    assert.equal(ERROR_ID, test('http:/:/'));
    assert.equal(ERROR_ID, test('htpp:/www.google.com'));
    assert.equal(ERROR_ID, test('ftp//ft.com'));
  });
  it('should be valid when `value` is a valid url', function() {
    assert.ok(!test('http://google.com'));
    assert.ok(!test('https://www.google.com'));
    assert.ok(!test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar'));
  });
});
