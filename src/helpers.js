import Validators from './validators'

export const HAS_PROP = {}.hasOwnProperty
export const TO_STRING = {}.toString

// eslint-disable-next-line no-useless-escape
let ESCAPE_REG = /([.+?^=!:${}()|[\]\/\\])/g // Removed star char
let ANY_REG = /\*/g

// string with "*" => RegExp
export function stringToReg (str) {
  return new RegExp('^' + str.replace(ESCAPE_REG, '\\$1').replace(ANY_REG, '.*') + '$', 'i')
}

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
      (typeof ifCond !== 'function' || ifCond(allValues, value, ...args)) &&
      (typeof unlessCond !== 'function' || !unlessCond(allValues, value, ...args))
    ) {
      return func(value, allValues, ...args)
    }
  }
}

export const trunc =
  Math.trunc ||
  /* istanbul ignore next */
  function trunc (num) {
    return num < 0 ? Math.ceil(num) : Math.floor(num)
  }

export const assign =
  Object.assign ||
  /* istanbul ignore next */
  function (obj) {
    for (let i = 1, len = arguments.length; i < len; ++i) {
      let source = arguments[i]
      if (source != null) for (let key in source) if (HAS_PROP.call(source, key)) obj[key] = source[key]
    }
    return obj
  }

export function selectNum (var1, var2) {
  return isNumber(var1) ? +var1 : arguments.length > 1 && isNumber(var2) ? +var2 : null
}

export function isNumber (num) {
  // eslint-disable-next-line
  return !isNaN(num) && (0 != num || '' !== ('' + num).trim())
}

export function isObject (obj) {
  return typeof obj === 'object' && TO_STRING.call(obj) === '[object Object]' && obj !== null
}

// Immutable.js compatibility
export function getIn (h, keys) {
  /* istanbul ignore next */
  if (typeof h.getIn === 'function') return h.getIn(keys)
  for (let i = 0, len = keys.length; i < len; ++i) h = (h || /* istanbul ignore next */ {})[keys[i]]
  return h
}

export function prepareMsg (msg, type) {
  let args = arguments
  let lastIndex = args.length - 1
  let values = args[lastIndex]
  if (typeof values === 'string') {
    values = void 0
    ++lastIndex
  }
  if (msg == null) {
    return defaultMessage(type, values)
  }
  if (HAS_PROP.call(msg, 'props') && isReactElement(msg)) {
    msg = msg.props
  }
  for (let i = lastIndex - 1; i >= 1; --i) {
    if (msg[args[i]] != null) {
      msg = msg[args[i]]
      break
    }
  }
  if (isObject(msg)) {
    if (HAS_PROP.call(msg, 'id') || HAS_PROP.call(msg, 'defaultMessage')) {
      return assign({}, msg, { values: values })
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
  func.cache = {}
  return function (options) {
    let memoize = options ? options.memoize : null
    if (memoize == null) memoize = Validators.defaultOptions.memoize
    if (memoize != null && !memoize) return func(options)
    let key = typeof memoize === 'function' ? memoize(options, stringify) : stringify(options)
    return HAS_PROP.call(func.cache, key) ? func.cache[key] : (func.cache[key] = func(options))
  }
}

// private
function defaultMessage (type, values) {
  let msg = Validators.messages[type]
  return typeof msg === 'string' ? { defaultMessage: msg, values: values } : assign({}, msg, { values: values })
}

function stringify (options) {
  let arr = []
  let value
  for (var k in options) {
    /* istanbul ignore else */
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
