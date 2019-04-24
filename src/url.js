import Validators from './validators'
import { regFormat, assign } from './helpers'

// user:pass BasicAuth (optional)
const BASIC_AUTH = '(?:\\S+(?::\\S*)?@)?'

// IP address dotted notation octets
const IPV4 =
  '(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)'

// the IPv6 matching part is from here: https://gist.github.com/syzdek/6086792
// IPv6 address in URLs are wrapped with []s
const IPV6 =
  `\\[(?:` +
  [
    // 1:2:3:4:5:6:7:8
    '(?:[\\da-f]{1,4}:){7,7}[\\da-f]{1,4}',
    // 2001:db8:3:4::192.0.2.33  64:ff9b::192.0.2.33  (IPv4-Embedded IPv6 Address)
    '(?:[\\da-f]{1,4}:){1,4}:' + IPV4,
    // ::255.255.255.255  ::ffff:255.255.255.255  ::ffff:0:255.255.255.255  (IPv4-mapped IPv6 addresses)
    '::(?:ffff(?::0{1,4}){0,1}:){0,1}' + IPV4,
    // 1::3:4:5:6:7:8  1::3:4:5:6:7:8 1::8
    '[\\da-f]{1,4}:(?:(?::[\\da-f]{1,4}){1,6})',
    // 1::4:5:6:7:8  1:2::4:5:6:7:8  1:2::8
    '(?:[\\da-f]{1,4}:){1,2}(?::[\\da-f]{1,4}){1,5}',
    // 1::5:6:7:8  1:2:3::5:6:7:8  1:2:3::8
    '(?:[\\da-f]{1,4}:){1,3}(?::[\\da-f]{1,4}){1,4}',
    // 1::6:7:8  1:2:3:4::6:7:8  1:2:3:4::8
    '(?:[\\da-f]{1,4}:){1,4}(?::[\\da-f]{1,4}){1,3}',
    // 1::7:8  1:2:3:4:5::7:8  1:2:3:4:5::8
    '(?:[\\da-f]{1,4}:){1,5}(?::[\\da-f]{1,4}){1,2}',
    // 1::8  1:2:3:4:5:6::8  1:2:3:4:5:6::8
    '(?:[\\da-f]{1,4}:){1,6}:[\\da-f]{1,4}',
    // 1::
    '(?:[\\da-f]{1,4}:){1,7}:',
    // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8  ::
    ':(?:(?::[\\da-f]{1,4}){1,7}|:)'
  ].join('|') +
  ')\\]'

// host & domain names, may end with dot
const HOST =
  // can be replaced by
  // '(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+' +
  '(?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+' +
  // TLD identifier name, may end with dot
  '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)'

// port number (optional)
const PORT = '(?::\\d{2,5})?'

// resource path (optional)
const PATH = '(?:[/][^\\s?#]*)?'

const SEARCH = '(?:[?][^\\s#]*)?'

const HASH = '(?:[#]\\S*)?'

const DEFAULT_OPTIONS = {
  emptyProtocol: true,
  protocolIdentifier: true,
  basicAuth: true,
  local: true,
  ipv4: true,
  ipv6: true,
  host: true,
  port: true,
  path: true,
  search: true,
  hash: true
}

const STRIP_PROTOCOL_REG = /:?\/\/$/

const CLEAN_UP_PROPS = ['protocol', 'ipv4', 'host', 'path', 'search', 'hash']

function parseURL (url, options) {
  options = defaultOptions(options)
  let parts = url.match(buildReg(options, true))
  if (!parts) return null
  let group = 1
  let h = {
    protocol: parts[group++].replace(STRIP_PROTOCOL_REG, '')
  }
  if (options.basicAuth) {
    let auth = parts[group++]
    if (auth) {
      let password = auth.slice(0, -1).split(':')
      let username = password.shift()
      h.basicAuth = { username, password: password.length ? password.join(':') : void 0 }
    }
  }
  if (options.ipv4) h.ipv4 = parts[group++]
  if (options.ipv6) {
    let ipv6 = parts[group++]
    if (ipv6) h.ipv6 = ipv6.slice(1, -1)
  }
  if (options.host) h.host = parts[group++]
  if (options.local) h.host = parts[group++] || h.host
  if (options.port) {
    let port = parts[group++]
    if (port) h.port = +port.slice(1)
  }
  if (options.path) h.path = parts[group++]
  if (options.search) h.search = parts[group++]
  if (options.hash) h.hash = parts[group++]

  // Clean up
  CLEAN_UP_PROPS.forEach(k => {
    if (!h[k]) delete h[k]
  })
  return h
}

// Uses "format" internally which is already memoized
let url = regFormat(options => buildReg(defaultOptions(options), false), 'url')

url.parseURL = parseURL

export default url

function defaultOptions (options) {
  options = assign({}, DEFAULT_OPTIONS, options)
  options.protocols = []
    .concat(options.protocol || options.protocols || Validators.defaultOptions.urlProtocols)
    .join('|')
  return options
}

function group (option, regPart, capture) {
  return option ? (capture ? `(${regPart})` : regPart) : ''
}

function buildReg (options, capture) {
  return new RegExp(
    '^' +
      group(
        true,
        `(?:(?:(?:${options.protocols}):)${options.emptyProtocol ? '?' : ''}\\/\\/)${
          options.protocolIdentifier ? '' : '?'
        }`,
        capture
      ) +
      group(options.basicAuth, BASIC_AUTH, capture) +
      `(?:${[
        group(options.ipv4, IPV4, capture),
        group(options.ipv6, IPV6, capture),
        group(options.host, HOST, capture),
        group(options.local, 'localhost', capture)
      ]
        .filter(g => g)
        .join('|')})` +
      group(options.port, PORT, capture) +
      group(options.path, PATH, capture) +
      group(options.search, SEARCH, capture) +
      group(options.hash, HASH, capture) +
      '$',
    'i'
  )
}
