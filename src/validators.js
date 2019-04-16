import messages from './messages'

var DEFAULT_OPTIONS = {
  memoize: true,
  allowBlank: false,
  urlProtocols: ['http', 'https'],
  dateFormat: 'yyyy-mm-dd', // ISO
  dateYmd: 'ymd',
  accept: ['1', 'true'],
  caseSensitive: true // confirmation, inclusion, exclusion
}

var Validators = {
  formatMessage,
  formatSize,
  defaultOptions: DEFAULT_OPTIONS,
  messages,
  pluralRules: {
    0: 'zero',
    1: 'one'
  }
}

export default Validators

function formatSize (size, unit) {
  return size + ' ' + unit
}

function formatMessage (msg) {
  if (msg.props) {
    msg = msg.props
  }
  let text = msg.defaultMessage || msg.id || /* istanbul ignore next */ ''
  let rules = Validators.pluralRules
  return !msg.values
    ? text
    : parseMsg(text, function (part) {
      let parts = part.split(',')
      let count = msg.values[parts[0]]
      // {value} OR {count, number}
      if (parts.length <= 2) {
        return count == null ? '' : '' + count
      }
      // plural
      let plural = parts
        .slice(2)
        .join(',')
        .trim()
      let info = {}
      let result = parseMsg(plural, null, rules[+count] || 'other', info)
      return info.found ? result : parseMsg(plural, null, 'other', {})
    })
}

function parseMsg (msg, func, pattern, info) {
  let start = msg.indexOf('{')
  if (start < 0) return pattern ? '' : msg
  let index = start
  let count = 1
  let len = msg.length
  while (count > 0 && index < len) {
    ++index
    if (msg.charAt(index) === '{') {
      ++count
    }
    if (msg.charAt(index) === '}') {
      --count
    }
  }
  if (pattern) {
    if (pattern === msg.slice(0, start).trim()) {
      info.found = true
      return msg.slice(start + 1, index).trim()
    }
    return parseMsg(msg.slice(index + 1), null, pattern, info)
  }

  // func gets all '{.*}' parts
  // e.g:
  // - {count}
  // - {count, plural, one {1 thing} other {many things}}
  // - ...
  return (
    msg.slice(0, start) +
    parseMsg(func(msg.slice(start + 1, index).trim()), func) +
    parseMsg(msg.slice(index + 1), func)
  )
}
