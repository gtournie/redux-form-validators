import messages from './messages'

export const HAS_PROP = ({}).hasOwnProperty
export const TO_STRING = ({}).toString

export const DEFAULT_OPTIONS = {
  allowBlank: false,
  urlProtocols: ['http', 'https'],
  dateFormat: 'yyyy-mm-dd', // ISO
  dateYmd: 'ymd',
  accept: ['1', 'true'],
  caseSensitive: true,      // confirmation, inclusion, exclusion
  pluralRules: {
    0: 'zero',
    1: 'one'
  }
};

let CUSTOM_OPTIONS = {}

export function setOptions (options) {
  CUSTOM_OPTIONS = options
}

export function getOptions () {
  return {
    ...DEFAULT_OPTIONS,
    ...CUSTOM_OPTIONS,
  }
}

let customMessages = messages

export function setMessages(messages) {
  customMessages = messages
}

export function getMessages() {
  return customMessages
}

export function regFormat (func, messageType) {
  return memoize(function(options) {
    options = options || {}
    let msg = options.msg || options.message

    return prepare(options['if'], options.unless, options.allowBlank, function (value) {
      if (!value.match(func(options))) {
        return getFormatMessage()(prepareMsg(msg, messageType))
      }
    })
  })
}


export function prepare (ifCond, unlessCond, allowBlank, func) {
  return function (value, allValues={}, ...args) {
    if (!value || 'object' !== typeof value) {
      value = null == value ? '' : '' + value

      if ((null != allowBlank ? allowBlank : getOptions().allowBlank) && !value.trim()) {
        return
      }
    }
    if (('function' !== typeof ifCond || ifCond(allValues, value)) &&
        ('function' !== typeof unlessCond || !unlessCond(allValues, value))) {
      return func(value, allValues, ...args)
    }
  }
}

export function trunc (num) {
  /* istanbul ignore next */
  return Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num)
}

export function selectNum (var1, var2) {
  return isNumber(var1) ? +var1 : (arguments.length > 1 && isNumber(var2) ? +var2 : null)
}

export function isNumber (num) {
  return !isNaN(num) && (0 != num || '' !== ('' + num).trim())
}

function formatMsg (msg) {
  if (msg.props) {
    msg = msg.props
  }
  let text = msg.defaultMessage || msg.id || ''
  let rules = getOptions().pluralRules
  return !msg.values ? text : parseMsg(text, function(part) {
    let parts = part.split(',')
    let count = msg.values[parts[0]]
    // {value} OR {count, number}
    if (parts.length <= 2) {
      return null == count ? '' : ('' + count)
    }
    // plural
    let plural = parts.slice(2).join(',').trim()
    let info = {}
    let result = parseMsg(plural, null, rules[+count] || 'other', info)
    return info.found ? result : parseMsg(plural, null, 'other', {})
  })
}

let customFormatMessage = formatMsg

export function setFormatMessage(formatMessage) {
  customFormatMessage = formatMessage
}

export function getFormatMessage() {
  return customFormatMessage
}

export function prepareMsg (msg, type, values) {
  if (null == msg) {
    return defaultMessage(type, values)
  }
  if (HAS_PROP.call(msg, 'props') && isReactElement(msg)) {
    msg = msg.props
  }
  if (null != msg[type]) {
    msg = msg[type]
  }
  if (isObject(msg)) {
    if (HAS_PROP.call(msg, 'id') || HAS_PROP.call(msg, 'defaultMessage')) {
      return Object.assign({}, msg, { values: values })
    }
    return defaultMessage(type, values)
  }
  return { id: msg, defaultMessage: msg, values: values }
}

export function toObjectMsg (msg) {
  if (null == msg) return null
  return isObject(msg) ? msg : { id: msg, defaultMessage: msg }
}

export function memoize (func) {
  if (!func.cache) {
    func.cache = {}
  }
  return function(options) {
    let key = stringify(options)
    return HAS_PROP.call(func.cache, key) ? func.cache[key] : (func.cache[key] = func(options))
  }
}

// private
function defaultMessage (type, values) {
  let msg = getMessages()[type]
  return 'string' === typeof msg
    ? { defaultMessage: msg, values: values }
    : Object.assign({}, msg, { values: values })
}

function parseMsg (msg, func, pattern, info) {
  let start = msg.indexOf('{')
  if (start < 0) return pattern ? '' : msg
  let index = start
  let count = 1
  let len = msg.length
  while (count > 0 && index < len) {
    ++index;
    if ('{' === msg.charAt(index)) {
      ++count;
    }
    if ('}' === msg.charAt(index)) {
      --count;
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
  return msg.slice(0, start) +
    parseMsg(func(msg.slice(start + 1, index).trim()), func) +
    parseMsg(msg.slice(index + 1), func)
}

function stringify (options) {
  let arr = []
  let value
  for (var k in options) {
    if (HAS_PROP.call(options, k)) {
      value = options[k]
      arr.push(k, isReactElement(value)
        ? stringify(value.props)
        : isObject(value) ? stringify(value) : value.toString())
    }
  }
  return JSON.stringify(arr)
}

function isReactElement (object) {
  return typeof object === 'object' && object !== null && '$$typeof' in object;
}

function isObject (obj) {
  return 'object' === typeof obj && '[object Object]' === TO_STRING.call(obj) && null !== obj;
}
