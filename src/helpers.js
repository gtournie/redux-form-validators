import Validators from './validators'

export const HAS_PROP = {}.hasOwnProperty
export const TO_STRING = {}.toString

export function regFormat (func, messageType) {
  return memoize(function (options) {
    options = options || {}
    let msg = options.msg || options.message

    return prepare(options['if'], options.unless, options.allowBlank, function (value) {
      if (!value.match(func(options))) {
        return Validators.formatMessage(prepareMsg(msg, messageType))
      }
    })
  })
}

export function prepare (ifCond, unlessCond, allowBlank, func) {
  return function (value, allValues = {}, ...args) {
    if (!value || typeof value !== 'object') {
      value = value == null ? '' : '' + value

      if ((allowBlank != null ? allowBlank : Validators.defaultOptions.allowBlank) && !value.trim()) {
        return
      }
    }
    if (
      (typeof ifCond !== 'function' || ifCond(allValues, value)) &&
      (typeof unlessCond !== 'function' || !unlessCond(allValues, value))
    ) {
      return func(value, allValues, ...args)
    }
  }
}

export function trunc (num) {
  /* istanbul ignore next */
  return Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num)
}

export function selectNum (var1, var2) {
  return isNumber(var1) ? +var1 : arguments.length > 1 && isNumber(var2) ? +var2 : null
}

export function isNumber (num) {
  // eslint-disable-next-line
  return !isNaN(num) && (0 != num || '' !== ('' + num).trim())
}

export function prepareMsg (msg, type, values) {
  if (msg == null) {
    return defaultMessage(type, values)
  }
  if (HAS_PROP.call(msg, 'props') && isReactElement(msg)) {
    msg = msg.props
  }
  if (msg[type] != null) {
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
  if (msg == null) return null
  return isObject(msg) ? msg : { id: msg, defaultMessage: msg }
}

export function memoize (func) {
  if (!func.cache) {
    func.cache = {}
  }
  return function (options) {
    let key = stringify(options)
    return HAS_PROP.call(func.cache, key) ? func.cache[key] : (func.cache[key] = func(options))
  }
}

// private
function defaultMessage (type, values) {
  let msg = Validators.messages[type]
  return typeof msg === 'string' ? { defaultMessage: msg, values: values } : Object.assign({}, msg, { values: values })
}

function stringify (options) {
  let arr = []
  let value
  for (var k in options) {
    if (HAS_PROP.call(options, k)) {
      value = options[k]
      arr.push(
        k,
        isReactElement(value) ? stringify(value.props) : isObject(value) ? stringify(value) : value.toString()
      )
    }
  }
  return JSON.stringify(arr)
}

function isReactElement (object) {
  return typeof object === 'object' && object !== null && '$$typeof' in object
}

function isObject (obj) {
  return typeof obj === 'object' && TO_STRING.call(obj) === '[object Object]' && obj !== null
}
