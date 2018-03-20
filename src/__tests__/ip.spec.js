import assert from 'assert'
import { ip } from '../index'
import getErrorId from './helper'


function test (value, params) {
    return getErrorId(ip(params)(value))
}

describe('Validator: ip', function() {
    it('should be valid when `value` is a valid ip', function() {
        assert.ok(!test('192.160.0.1'))
    });
    it('should be invalid when `value` is a invalid ip', function() {
        assert.ok(test('192.160.0.1992'))
    })
})
