import React from 'react'
import { FormattedMessage } from 'react-intl'
import { formatMessage, prepare } from './helpers'


export default function absence ({ message, msg, 'if': ifCond, unless }={}) {
  msg = formatMessage(msg || message)
    || <FormattedMessage id="form.errors.absence" defaultMessage="must be blank" />

  return prepare(ifCond, unless, false, function (value) {
    if (value.trim()) {
      return msg
    }
  })
}