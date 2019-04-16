import assert from 'assert'
import Validators, { file } from '../index'
import getErrorId from './helper'

const ERROR_FILE = 'form.errors.file'
const ERROR_ACCEPT = 'form.errors.fileAccept'
const ERROR_TOO_BIG = 'form.errors.fileTooBig'
const ERROR_TOO_FEW = 'form.errors.fileTooFew'
const ERROR_TOO_MANY = 'form.errors.fileTooMany'
const ERROR_TOO_SMALL = 'form.errors.fileTooSmall'

const SIZE_UNITS = {
  B: 1,
  KB: 1024,
  MB: 1048576,
  GB: 1073741824,
  TB: 1099511627776,
  PB: 1125899906842624,
  EB: 1152921504606847000
}

function test (value, params) {
  return getErrorId(file(params)(value))
}

describe('Validator: file', function () {
  it('should be invalid when `value` is not a valid file', function () {
    assert.strictEqual(ERROR_FILE, test(''))
    assert.strictEqual(ERROR_FILE, test({}))
    assert.strictEqual(ERROR_FILE, test([]))
  })
  it('should be invalid when `value` is a File with a bad type', function () {
    assert.strictEqual(ERROR_ACCEPT, test(new File({ type: 'audio/mp3', name: 'foo.bar' }), { accept: 'mp3,bar' }))
    assert.strictEqual(ERROR_ACCEPT, test(new File({ type: 'audio/mp3', name: '.htaccess' }), { accept: '.htaccess' }))
    assert.strictEqual(ERROR_ACCEPT, test(new FileList([{ type: 'video/mp4', name: 'foo.bar' }]), { accept: '.mp4' }))
    assert.strictEqual(ERROR_ACCEPT, test(new FileList([{ type: 'video/mp4', name: 'foo.jpeg' }]), { accept: '.jp*g' }))
    assert.strictEqual(
      ERROR_ACCEPT,
      test(new FileList([{ type: 'jpeg', name: 'foo.bar' }, { type: 'imag/png', name: 'foo.zip' }]), {
        accept: 'audio/*, .foo'
      })
    )
    assert.strictEqual(
      ERROR_ACCEPT,
      test(new FileList([{ type: 'jpeg', name: 'foo.bar' }, { type: 'imag/png', name: 'foo.zip' }]), {
        accept: 'audio/*, .zip'
      })
    )
    assert.strictEqual(
      ERROR_ACCEPT,
      test(new FileList([{ type: 'application/zip', name: 'foo.bar' }]), {
        accept: '.application,foo.bar,.zip,application/gzip'
      })
    )
  })
  it("should be invalid when `value` doesn't contain the right amount of files", function () {
    assert.strictEqual(ERROR_TOO_FEW, test(new File(), { minFiles: 2 }))
    assert.strictEqual(ERROR_TOO_FEW, test(new File({ name: 'foo' }), { minFiles: 2 }))
    assert.strictEqual(ERROR_TOO_FEW, test(new FileList({ length: 0 })))
    assert.strictEqual(ERROR_TOO_FEW, test(new FileList({ length: 0 }), { minFiles: 1 }))
    assert.strictEqual(ERROR_TOO_FEW, test(new FileList({ length: 1 }), { minFiles: 2 }))
    assert.strictEqual(ERROR_TOO_FEW, test(new FileList([{}]), { minFiles: 2 }))

    assert.strictEqual(ERROR_TOO_MANY, test(new File(), { maxFiles: 0 }))
    assert.strictEqual(ERROR_TOO_MANY, test(new FileList([{ name: 'foo' }, {}]), { maxFiles: 1 }))
  })
  it('should be invalid when `value` is a File with a bad size', function () {
    assert.ok(!test(new File({ size: 1024 }), { minSize: 512 }))

    Object.keys(SIZE_UNITS).forEach(function (unit) {
      let size = SIZE_UNITS[unit]

      let size1 = size - (size > 1125899906842624 ? 1000 : 1)
      assert.strictEqual(ERROR_TOO_SMALL, test(new File({ size: size1 }), { minSize: size }))
      assert.strictEqual(ERROR_TOO_SMALL, test(new FileList([{ size: size1 }]), { minSize: size }))
      assert.strictEqual(ERROR_TOO_SMALL, test(new FileList([{ size: size1 }]), { minSize: '1' + unit }))
      assert.strictEqual(ERROR_TOO_SMALL, test(new FileList([{ size: size1 }]), { minSize: '1 ' + unit }))
      assert.strictEqual(ERROR_TOO_SMALL, test(new FileList([{ size: size1 }]), { minSize: '1. ' + unit }))
      assert.strictEqual(ERROR_TOO_SMALL, test(new FileList([{ size: size1 }]), { minSize: '1.0001 ' + unit }))
      assert.strictEqual(ERROR_TOO_SMALL, test(new FileList([{ size: size1 }]), { minSize: '1.0001' + unit }))

      let size2 = size + (size > 1125899906842624 ? 1000 : 1)
      assert.strictEqual(ERROR_TOO_BIG, test(new File({ size: size2 }), { maxSize: size }))
      assert.strictEqual(ERROR_TOO_BIG, test(new FileList([{ size: size2 }]), { maxSize: size }))
      assert.strictEqual(ERROR_TOO_BIG, test(new FileList([{ size: size2 }]), { maxSize: '1' + unit }))
      assert.strictEqual(ERROR_TOO_BIG, test(new FileList([{ size: size2 }]), { maxSize: '1 ' + unit }))
      assert.strictEqual(ERROR_TOO_BIG, test(new FileList([{ size: size2 }]), { maxSize: '1. ' + unit }))
      assert.strictEqual(ERROR_TOO_BIG, test(new FileList([{ size: size2 }]), { maxSize: '0.9999 ' + unit }))
      assert.strictEqual(ERROR_TOO_BIG, test(new FileList([{ size: size2 }]), { maxSize: '0.9999' + unit }))
    })
  })
  it('should output an error if an error occurs parsing minSize or maxSize', function () {
    test(new File(), { minSize: 'abc' })
    assert.ok(console.__lastErrorIncludes('size') && console.__lastErrorIncludes('unknown'))
    test(new File(), { maxSize: '5MKB' })
    assert.ok(console.__lastErrorIncludes('size') && console.__lastErrorIncludes('unknown'))
  })
  it('should be valid when `value` is a valid FileList/File', function () {
    assert.ok(!test(new FileList([new File()])))
    assert.ok(!test(new FileList([{}])))
    assert.ok(!test([new File()]))
    assert.ok(!test(new File()))
  })
  it('should be valid when `value` is a File with a correct type', function () {
    assert.ok(!test(new File({ type: 'audio/mp3', name: 'foo.bar' }), { accept: '.bar' }))
    assert.ok(!test(new File({ type: 'audio/mp3', name: 'foo.bar' }), { accept: '.zip,    .bar ' }))
    assert.ok(!test(new File({ type: 'audio/mp3', name: 'foo.bar' }), { accept: 'audio/mp3' }))
    assert.ok(!test(new File({ type: 'audio/mp3', name: 'foo.bar' }), { accept: '.zip,audio/mp3' }))
    assert.ok(!test(new FileList([{ type: 'video/mp4', name: 'foo.bar' }]), { accept: 'video/*' }))
    assert.ok(!test(new FileList([{ type: 'application/zip', name: 'foo.bar' }]), { accept: 'application*' }))
    assert.ok(!test(new FileList([{ type: 'application/zip', name: 'foo.bar' }]), { accept: 'application/*' }))
    assert.ok(!test(new FileList([{ type: 'application/pdf', name: 'foo.bar' }]), { accept: '*pdf' }))
    assert.ok(!test(new FileList([{ type: 'application/x-pdf', name: 'foo.bar' }]), { accept: '*pdf' }))
    assert.ok(
      !test(new FileList([{ type: 'abc', name: 'foo.jpg' }, { type: 'abc', name: 'foo.png' }]), {
        accept: '.gif, .jpg,.png'
      })
    )
  })
  it('should be valid when `value` contain the right amount of files', function () {
    assert.ok(!test(new File(), { minFiles: 1 }))
    assert.ok(!test(new File(), { maxFiles: 1 }))
    assert.ok(!test(new FileList(), { minFiles: 0 }))
    assert.ok(!test(new FileList({ length: 0 }), { minFiles: 0 }))
    assert.ok(!test(new FileList({ length: 2 }), { minFiles: 2 }))
    assert.ok(!test(new FileList({ length: 3 }), { minFiles: 2 }))
    assert.ok(!test(new FileList([{}, {}]), { minFiles: 2 }))
    assert.ok(!test(new FileList([{}, {}, {}]), { minFiles: 2 }))
    assert.ok(!test(new FileList({ length: 2 }), { maxFiles: 2 }))
    assert.ok(!test(new FileList({ length: 2 }), { maxFiles: 3 }))
    assert.ok(!test(new FileList([{}, {}]), { maxFiles: 2 }))
    assert.ok(!test(new FileList([{}, {}]), { maxFiles: 3 }))
    assert.ok(!test(new FileList([{}, {}, {}]), { maxFiles: -1 }))
  })
  it('should be valid when `value` is a File with the correct size', function () {
    assert.ok(!test(new File({ size: 1024 }), { minSize: 512 }))

    Object.keys(SIZE_UNITS).forEach(function (unit) {
      let size = SIZE_UNITS[unit]

      assert.ok(!test(new File({ size: size }), { minSize: size }))
      assert.ok(!test(new FileList([{ size: size }]), { minSize: size }))
      assert.ok(!test(new FileList([{ size: size }]), { minSize: size - 1 }))
      assert.ok(!test(new FileList([{ size: size }]), { minSize: '1' + unit }))
      assert.ok(!test(new FileList([{ size: size }]), { minSize: '1 ' + unit }))
      assert.ok(!test(new FileList([{ size: size }]), { minSize: '1. ' + unit }))
      assert.ok(!test(new FileList([{ size: size }]), { minSize: '0.99 ' + unit }))
      assert.ok(!test(new FileList([{ size: size }]), { minSize: '0.99' + unit }))

      assert.ok(!test(new File({ size: size }), { maxSize: size }))
      assert.ok(!test(new FileList([{ size: size }]), { maxSize: size }))
      assert.ok(!test(new FileList([{ size: size }]), { maxSize: size + 1 }))
      assert.ok(!test(new FileList([{ size: size }]), { maxSize: '1' + unit }))
      assert.ok(!test(new FileList([{ size: size }]), { maxSize: '1 ' + unit }))
      assert.ok(!test(new FileList([{ size: size }]), { maxSize: '1. ' + unit }))
      assert.ok(!test(new FileList([{ size: size }]), { maxSize: '1.01 ' + unit }))
      assert.ok(!test(new FileList([{ size: size }]), { maxSize: '1.01' + unit }))

      assert.ok(!test(new FileList([{ size: size }]), { minSize: size, maxSize: size }))
      assert.ok(!test(new FileList([{ size: size }]), { minSize: size - 1, maxSize: size + 1 }))
    })
  })
  it('should use formatSize', function () {
    let formatMessage = Validators.formatMessage
    let defaultValue = Validators.formatSize
    let unitMap = {
      B: 'octets',
      KB: 'Ko'
    }

    Validators.formatMessage = ValidatorsFormatMessage
    Validators.formatSize = function (size, unit) {
      return size + ' ' + unitMap[unit]
    }

    assert.strictEqual('2 octets', file({ msg: '{size}', minSize: '2B' })(new File({ size: 1 })))
    assert.strictEqual('1 Ko', file({ msg: '{size}', minSize: '1KB' })(new File({ size: 1 })))
    assert.strictEqual('1024 octets', file({ msg: '{size}', minSize: 1024 })(new File({ size: 1 })))

    Validators.formatSize = defaultValue
    Validators.formatMessage = formatMessage
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.strictEqual(ERROR_FILE + '2', test({}))
    assert.strictEqual(ERROR_ACCEPT + '2', test(new FileList([{ type: 'video/mp4', name: 'foo' }]), { accept: '.zip' }))
    assert.strictEqual(ERROR_TOO_BIG + '2', test(new FileList([{ size: 2 }]), { maxSize: 1 }))
    assert.strictEqual(ERROR_TOO_FEW + '2', test(new FileList([{}]), { minFiles: 2 }))
    assert.strictEqual(ERROR_TOO_MANY + '2', test(new FileList([{}, {}]), { maxFiles: 1 }))
    assert.strictEqual(ERROR_TOO_SMALL + '2', test(new FileList([{ size: 1 }]), { minSize: 2 }))

    Validators.formatMessage = defaultValue
  })
})
