import React from 'react'
import { FormattedMessage } from 'react-intl'
import format from './format'


export var DEFAULT_ALLOW_BLANK = false;


export function regFormat (options, reg, messageId) {
  options.msg = options.msg || options.message || messageId
  options.with = reg
  return format(options)
}

export function prepare (ifCond, unlessCond, allowBlank, func) {
  return function (value='', allValues={}) {
    value = '' + value
    if (allowBlank && !value.trim()) {
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

export function formatMessage (msg) {
  if (null == msg) return null
  return 'string' === typeof msg ? <FormattedMessage id={msg} /> : <FormattedMessage {...(msg.props || msg)} />
}