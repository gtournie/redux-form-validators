import React from 'react'
import { FormattedMessage } from 'react-intl'
import { formatMessage, prepare, memoize } from './helpers'


let absence = memoize(function ({ message, msg, 'if': ifCond, unless }={}) {
  msg = formatMessage(msg || message)
    || <FormattedMessage id="form.errors.absence" defaultMessage="must be blank" />

  return prepare(ifCond, unless, false, function (value) {
    if (value.trim()) {
      return msg
    }
  })
})

export default absence