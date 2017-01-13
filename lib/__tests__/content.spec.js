// import assert from 'assert';
// import { content } from '../index';
// import getErrorId from './helper';
//
// const ERROR_INC_ID = 'form.errors.include';
// const ERROR_EXC_ID = 'form.errors.exclude';
//
// function test(value, params) {
//   return getErrorId(content(params)(value));
// }
//
// describe('Validator: content', function() {
//   it('should be invalid when inc not included in `value`', function() {
//     assert.equal(ERROR_INC_ID, test(123,      { inc: '0' }));
//     assert.equal(ERROR_INC_ID, test('123',    { inc: '00' }));
//     assert.equal(ERROR_INC_ID, test('foo',    { include: 'foobar' }));
//   });
//   it('should be invalid when exc is included in `value`', function() {
//     assert.equal(ERROR_EXC_ID, test(123, { exc: '1' }));
//     assert.equal(ERROR_EXC_ID, test('123', { exc: '23' }));
//     assert.equal(ERROR_EXC_ID, test('foobar', { exclude: 'foo' }));
//   });
//   it('should be valid when inc is included in `value`', function() {
//     assert.ok(!test(1234567,  { inc: 345 }));
//     assert.ok(!test('12344',  { inc: '34' }));
//     assert.ok(!test('foobar', { include: 'foo' }));
//   });
//   it('should be valid when exc is included in `value`', function() {
//     assert.ok(!test(123,      { exc: '0' }));
//     assert.ok(!test('123',    { exc: '00' }));
//     assert.ok(!test('foo',    { exclude: 'foobar' }));
//   });
// });
"use strict";