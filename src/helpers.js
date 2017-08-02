import format from './format'

export var DEFAULT_OPTIONS = {
  allowBlank: false,
  urlProtocols: ['http', 'https'],
  dateFormat: 'yyyy-mm-dd', // ISO
  dateYmd: 'ymd',
  accept: ['1', 'true'],
  caseSensitive: true       // confirmation, inclusion, exclusion
};


export function regFormat (options, reg, messageId) {
  options.msg = options.msg || options.message || messageId
  options.with = reg
  return format(options)
}

export function prepare (ifCond, unlessCond, allowBlank, func) {
  return function (value='', allValues={}) {
    value = '' + value

    if ((null != allowBlank ? allowBlank : DEFAULT_OPTIONS.allowBlank) && !value.trim()) {
      return
    }
    if (('function' !== typeof ifCond || ifCond(allValues, value)) &&
        ('function' !== typeof unlessCond || !unlessCond(allValues, value))) {
      return func(value, allValues)
    }
  }
}

export function trunc (num) {
  return Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num)
}

export function isNumber (num) {
  return !isNaN(num) && '' !== ('' + num).trim()
}

let pluralRules = {
  0:     /zero\s*\{(.*?)\}/,
  1:     /one\s*\{(.*?)\}/,
  other: /other\s*\{(.*?)\}/
}

let TEMPLATE_REG = /\{([^{}]*\{[^{}]*\}[^{}]*)+\}|\{(.*?)\}/g

export function formatMsg (msg) {
  if (msg.props) {
    msg = msg.props
  }
  let text = msg.defaultMessage || msg.id;
  return ((!msg.values ? text : text) || '').replace(TEMPLATE_REG, function(content) {
    let parts = content.slice(1, -1).split(',')
    let count = msg.values[parts[0]]
    if (parts.length <= 2) {
      return null == count ? '' : count
    }
    let plural = parts[2].trim()
    let rules = pluralRules[+count]
    let result
    if (rules && (result = plural.match(rules))) {
      return result[1]
    }
    return (plural.match(pluralRules.other) || [])[1] || ''
  })
}

export function toObjectMsg (msg) {
  if (null == msg) return null
  return isObject(msg) ? msg : { id: msg, defaultMessage: msg }
}

export function addMsgValues (msg, values) {
  return Object.assign({}, msg, { values: values })
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
const HAS_PROP = ({}).hasOwnProperty
const TO_STRING = ({}).toString

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

function isReactElement(object) {
  return typeof object === 'object' && object !== null && '$$typeof' in object;
}

function isObject(obj) {
  return 'object' === typeof obj && '[object Object]' === TO_STRING.call(obj) && null !== obj;
}