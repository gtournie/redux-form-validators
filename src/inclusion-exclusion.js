import React from 'react'
import { FormattedMessage } from 'react-intl'
import { formatMessage, prepare, DEFAULT_ALLOW_BLANK } from './helpers'


const DEFAULT_CASE_SENSITIVE = true


export function inclusion (options) {
  return inclusionExclusion(true, options)
}

export function exclusion (options) {
  return inclusionExclusion(false, options)
}

function inclusionExclusion (inclusion, {
      'in': inc, within,
      caseSensitive,
      message, msg,
      'if': ifCond, unless,
      allowBlank=DEFAULT_ALLOW_BLANK
    }) {
  msg = formatMessage(msg || message)

  caseSensitive = (null != caseSensitive ? caseSensitive : DEFAULT_CASE_SENSITIVE)

  within = [].concat(within || inc).map(function(val) {
    return caseSensitive ? ('' + val) : ('' + val).toLowerCase()
  })

  return prepare(ifCond, unless, allowBlank, function (value) {
    if (!caseSensitive) {
      value = value.toLowerCase()
    }
    if (inclusion) {
      if (within.indexOf(value) < 0) {
        return msg || (<FormattedMessage id="form.errors.inclusion" defaultMessage="is not included in the list" />)
      }
    } else {
      if (within.indexOf(value) >= 0) {
        return msg || (<FormattedMessage id="form.errors.exclusion" defaultMessage="is reserved" />)
      }
    }
  })
}