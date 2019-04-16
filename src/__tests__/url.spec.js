import assert from 'assert'
import Validators, { url } from '../index'
import getErrorId from './helper'

const ERROR_ID = 'form.errors.url'

function test (value, params) {
  return getErrorId(url(params)(value))
}

describe('Validator: url', function () {
  it('should be invalid when `value` is not a valid url', function () {
    assert.strictEqual(ERROR_ID, test(''))
    assert.strictEqual(ERROR_ID, test('http://'))
    assert.strictEqual(ERROR_ID, test('http://.'))
    assert.strictEqual(ERROR_ID, test('http://..'))
    assert.strictEqual(ERROR_ID, test('http://../'))
    assert.strictEqual(ERROR_ID, test('http://?'))
    assert.strictEqual(ERROR_ID, test('http://??'))
    assert.strictEqual(ERROR_ID, test('http://??/'))
    assert.strictEqual(ERROR_ID, test('http://#'))
    assert.strictEqual(ERROR_ID, test('http://##'))
    assert.strictEqual(ERROR_ID, test('http://##/'))
    assert.strictEqual(ERROR_ID, test('http://foo.bar?q=Spaces should be encoded'))
    assert.strictEqual(ERROR_ID, test('//'))
    assert.strictEqual(ERROR_ID, test('//a'))
    assert.strictEqual(ERROR_ID, test('///a'))
    assert.strictEqual(ERROR_ID, test('///'))
    assert.strictEqual(ERROR_ID, test('http:///a'))
    assert.strictEqual(ERROR_ID, test('foo.com'))
    assert.strictEqual(ERROR_ID, test('rdar://1234'))
    assert.strictEqual(ERROR_ID, test('h://test'))
    assert.strictEqual(ERROR_ID, test('http:// shouldfail.com'))
    assert.strictEqual(ERROR_ID, test(':// should fail'))
    assert.strictEqual(ERROR_ID, test('http://foo.bar/foo(bar)baz quux'))
    assert.strictEqual(ERROR_ID, test('ftps://foo.bar/'))
    assert.strictEqual(ERROR_ID, test('http://-error-.invalid/'))
    assert.strictEqual(ERROR_ID, test('http://-a.b.co'))
    assert.strictEqual(ERROR_ID, test('http://a.b-.co'))
    assert.strictEqual(ERROR_ID, test('http://1.1.1.1.1'))
    assert.strictEqual(ERROR_ID, test('http://123.123.123'))
    assert.strictEqual(ERROR_ID, test('http://3628126748'))
    assert.strictEqual(ERROR_ID, test('http://.www.foo.bar/'))
    assert.strictEqual(ERROR_ID, test('http://.www.foo.bar./'))
  })
  it('should be valid when `value` is a valid url', function () {
    assert.ok(!test('http://foo.com/blah_blah'))
    assert.ok(!test('http://foo.com/blah_blah/'))
    assert.ok(!test('http://foo.com/blah_blah_(wikipedia)'))
    assert.ok(!test('http://foo.com/blah_blah_(wikipedia)_(again)'))
    assert.ok(!test('http://www.example.com/wpstyle/?p=364'))
    assert.ok(!test('https://www.example.com/foo/?bar=baz&inga=42&quux'))
    assert.ok(!test('http://✪df.ws/123'))
    assert.ok(!test('http://userid:password@example.com:8080'))
    assert.ok(!test('http://userid:password@example.com:8080/'))
    assert.ok(!test('http://userid@example.com'))
    assert.ok(!test('http://userid@example.com/'))
    assert.ok(!test('http://userid@example.com:8080'))
    assert.ok(!test('http://userid@example.com:8080/'))
    assert.ok(!test('http://userid:password@example.com'))
    assert.ok(!test('http://userid:password@example.com/'))
    assert.ok(!test('http://142.42.1.1/'))
    assert.ok(!test('http://142.42.1.1:8080/'))
    assert.ok(
      !test(
        'https://userid::password@[2001:db8:85a3::8a2e:370:7334]:483/path/example?foobar=8&abc=2&bcd=5#product=browser+what&stuff'
      )
    )
    assert.ok(!test('http://➡.ws/䨹'))
    assert.ok(!test('http://⌘.ws'))
    assert.ok(!test('http://⌘.ws/'))
    assert.ok(!test('http://foo.com/blah_(wikipedia)#cite-1'))
    assert.ok(!test('http://foo.com/blah_(wikipedia)_blah#cite-1'))
    assert.ok(!test('http://foo.com/unicode_(✪)_in_parens'))
    assert.ok(!test('http://foo.com/(something)?after=parens'))
    assert.ok(!test('http://☺.damowmow.com/'))
    assert.ok(!test('http://code.google.com/events/#&product=browser'))
    assert.ok(!test('http://j.mp'))
    assert.ok(!test('http://foo.bar/?q=Test%20URL-encoded%20stuff'))
    assert.ok(!test('http://مثال.إختبار'))
    assert.ok(!test('http://例子.测试'))
    assert.ok(!test('http://उदाहरण.परीक्षा'))
    assert.ok(!test("http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com"))
    assert.ok(!test('http://1337.net'))
    assert.ok(!test('http://a.b-c.de'))
    assert.ok(!test('http://223.255.255.254'))
    assert.ok(!test('https://foo_bar.example.com/'))
    assert.ok(!test('//example.net'))
  })
  it('should be invalid if the protocol is empty', function () {
    assert.strictEqual(ERROR_ID, test('//google.com', { emptyProtocol: false }))
    assert.strictEqual(ERROR_ID, test('//foo:bar@128.193.1.32:3000/foo?foo=bar', { emptyProtocol: false }))
  })
  it("should be invalid if the protocols don't match", function () {
    assert.strictEqual(ERROR_ID, test('http://google.com', { protocol: 'ftp' }))
    assert.strictEqual(ERROR_ID, test('http://google.com', { protocol: ['ftp', 'https'] }))
    assert.strictEqual(ERROR_ID, test('http://google.com', { protocols: 'https' }))
    assert.strictEqual(ERROR_ID, test('http://google.com', { protocols: ['ftp', 'https'] }))
    assert.strictEqual(ERROR_ID, test('https://www.google.com', { protocol: 'ftp' }))
    assert.strictEqual(ERROR_ID, test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar', { protocol: 'http' }))
  })
  it('should only be valid with certain protocols', function () {
    assert.ok(!test('ftp://foo.bar/baz', { protocol: 'ftp' }))
    assert.ok(!test('http://google.com', { protocol: 'http' }))
    assert.ok(!test('http://google.com', { protocol: ['http', 'https'] }))
    assert.ok(!test('http://google.com', { protocol: ['ftp', 'http', 'https'] }))
    assert.ok(!test('http://google.com', { protocols: 'http' }))
    assert.ok(!test('http://google.com', { protocols: ['ftp', 'http', 'https'] }))
    assert.ok(!test('https://www.google.com', { protocol: 'https' }))
    assert.ok(!test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar', { protocol: 'ftp' }))
  })
  it('should be valid with no protocol identifier', function () {
    assert.ok(!test('google.com', { protocolIdentifier: false }))
    assert.ok(!test('userid:password@google.com/path?search=foo#stuff', { protocolIdentifier: false }))
  })
  it('should be invalid if basic auth not allowed', function () {
    assert.strictEqual(ERROR_ID, test('http://userid:password@google.com', { basicAuth: false }))
    assert.strictEqual(ERROR_ID, test('http://userid@google.com', { basicAuth: false }))
    assert.strictEqual(
      ERROR_ID,
      test('http://userid:password@217.64.0.1:3838/path?search=foo#stuff', { basicAuth: false })
    )
  })
  it('should be invalid if ipv4 not allowed', function () {
    assert.strictEqual(ERROR_ID, test('http://217.64.0.1', { ipv4: false }))
    assert.strictEqual(ERROR_ID, test('http://217.64.0.1:3838', { ipv4: false }))
    assert.strictEqual(ERROR_ID, test('http://userid:password@217.64.0.1:3838/path?search=foo#stuff', { ipv4: false }))
  })
  it('should be invalid if ipv6 not allowed', function () {
    assert.strictEqual(ERROR_ID, test('http://[::1]', { ipv6: false }))
    assert.strictEqual(ERROR_ID, test('http://[2001:db8:85a3::8a2e:370:7334]:3838', { ipv6: false }))
    assert.strictEqual(
      ERROR_ID,
      test('http://userid:password@[2001:db8:85a3::8a2e:370:7334]:3838/path?search=foo#stuff', { ipv6: false })
    )
  })
  it('should be invalid if host not allowed', function () {
    assert.strictEqual(ERROR_ID, test('http://google.com', { host: false }))
    assert.strictEqual(ERROR_ID, test('http://www.google.com', { host: false }))
    assert.strictEqual(ERROR_ID, test('http://userid:password@google.com/path?search=foo#stuff', { host: false }))
  })
  it('should be invalid if local not allowed', function () {
    assert.strictEqual(ERROR_ID, test('http://localhost', { local: false }))
    assert.strictEqual(ERROR_ID, test('http://localhost:3000', { local: false }))
    assert.strictEqual(ERROR_ID, test('http://userid:password@localhost:4000/path?search=foo#stuff', { local: false }))
  })
  it('should be invalid if port not allowed', function () {
    assert.strictEqual(ERROR_ID, test('http://localhost:2000', { port: false }))
    assert.strictEqual(ERROR_ID, test('http://217.64.0.1:3000', { port: false }))
    assert.strictEqual(ERROR_ID, test('https://userid:password@google.com:483/path?search=foo#stuff', { port: false }))
  })
  it('should be invalid if path not allowed', function () {
    assert.strictEqual(ERROR_ID, test('http://localhost/path', { path: false }))
    assert.strictEqual(ERROR_ID, test('http://217.64.0.1:3000/path', { path: false }))
    assert.strictEqual(ERROR_ID, test('http://userid:password@google.com:8080/path?search=foo#stuff', { path: false }))
  })
  it('should be invalid if search not allowed', function () {
    assert.strictEqual(ERROR_ID, test('http://localhost?search', { search: false }))
    assert.strictEqual(ERROR_ID, test('http://217.64.0.1:3000/?search', { search: false }))
    assert.strictEqual(
      ERROR_ID,
      test('http://userid:password@google.com:8080/path?search=foo#stuff', { search: false })
    )
  })
  it('should be invalid if hash not allowed', function () {
    assert.strictEqual(ERROR_ID, test('http://localhost#hash', { hash: false }))
    assert.strictEqual(ERROR_ID, test('http://217.64.0.1:3000/#hash99', { hash: false }))
    assert.strictEqual(ERROR_ID, test('http://userid:password@google.com:8080/path?search=foo#stuff', { hash: false }))
  })
  it('should use default urlProtocols option', function () {
    let defaultValue = Validators.defaultOptions.urlProtocols

    Validators.defaultOptions.urlProtocols = ['ftp']
    assert.strictEqual(ERROR_ID, test('http://google.com'))
    assert.strictEqual(ERROR_ID, test('https://www.google.com'))
    assert.strictEqual(ERROR_ID, test('http://foo:bar@128.193.1.32:3000/foo?foo=bar'))
    assert.ok(!test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar'))

    Validators.defaultOptions.urlProtocols = ['http', 'https']
    assert.ok(!test('http://google.com'))
    assert.ok(!test('https://www.google.com'))
    assert.ok(!test('http://foo:bar@128.193.1.32:3000/foo?foo=bar'))
    assert.strictEqual(ERROR_ID, test('ftp://foo:bar@128.193.1.32:3000/foo?foo=bar'))

    Validators.defaultOptions.urlProtocols = defaultValue
  })
  it('should use formatMessage', function () {
    let defaultValue = Validators.formatMessage

    Validators.formatMessage = function (msg) {
      return Object.assign({}, msg, { id: msg.id + '2' })
    }
    assert.strictEqual(ERROR_ID + '2', test('http:/:/'))

    Validators.formatMessage = defaultValue
  })
  it('should parse a URL', function () {
    let h = url.parseURL('http://userid:password@google.com:8080/path?search=foo#stuff')
    assert.strictEqual(h.protocol, 'http')
    assert.strictEqual(h.basicAuth.username, 'userid')
    assert.strictEqual(h.basicAuth.password, 'password')
    assert.strictEqual(h.host, 'google.com')
    assert.strictEqual(h.port, 8080)
    assert.strictEqual(h.path, '/path')
    assert.strictEqual(h.search, '?search=foo')
    assert.strictEqual(h.hash, '#stuff')

    h = url.parseURL('http://userid@google.com')
    assert.strictEqual(h.basicAuth.username, 'userid')
    assert.strictEqual(h.basicAuth.password, void 0)

    assert.deepStrictEqual(
      url.parseURL('http://google.com', {
        basicAuth: false,
        ipv4: false,
        ipv6: false,
        local: false,
        port: false,
        path: false,
        search: false,
        hash: false
      }),
      {
        protocol: 'http',
        host: 'google.com'
      }
    )

    assert.deepStrictEqual(url.parseURL('https://localhost', { host: false }), {
      protocol: 'https',
      host: 'localhost'
    })

    h = url.parseURL('http://userid:password@localhost:8080/path?search=foo#stuff')
    assert.strictEqual(h.host, 'localhost')

    h = url.parseURL('http://userid:password@128.193.1.32:8080/path?search=foo#stuff')
    assert.strictEqual(h.ipv4, '128.193.1.32')

    h = url.parseURL('http://userid:password@[2001:db8:85a3::8a2e:370:7334]:8080/path?search=foo#stuff')
    assert.strictEqual(h.ipv6, '2001:db8:85a3::8a2e:370:7334')
  })
  it('should not parse a URL', function () {
    assert.strictEqual(url.parseURL('http://userid:password@google.com', { basicAuth: false }), null)
    assert.strictEqual(url.parseURL('http://google.com', { host: false }), null)
    assert.strictEqual(url.parseURL('http://128.193.1.32', { ipv4: false }), null)
    assert.strictEqual(url.parseURL('http://[2001:db8:85a3::8a2e:370:7334]', { ipv6: false }), null)
    assert.strictEqual(url.parseURL('http://google.com/path', { path: false }), null)
    assert.strictEqual(url.parseURL('http://google.com?search', { search: false }), null)
    assert.strictEqual(url.parseURL('http://google.com#hash', { hash: false }), null)
  })
})
