import React from 'react'
import { FormattedMessage } from 'react-intl'
import { formatMessage, prepare, isNumber, memoize, DEFAULT_ALLOW_BLANK } from './helpers'


let length = memoize(function ({
      '=': equal, is,
      max, maximum,
      min, minimum,
      'in': range, within,
      message, msg,
      'if': ifCond, unless,
      allowBlank=DEFAULT_ALLOW_BLANK
    }) {
  msg   = formatMessage(msg || message)

  equal = isNumber(equal) ? equal : is
  min   = isNumber(min)   ? min   : minimum
  max   = isNumber(max)   ? max   : maximum
  range = range || within
  if (range && isNumber(range[0]) && isNumber(range[1])) {
    min = range[0]
    max = range[1]
  }

  return prepare(ifCond, unless, allowBlank, function (value) {
    if (isNumber(equal) && value.length !== +equal) {
      return msg || (
        <FormattedMessage id="form.errors.wrongLength"
          defaultMessage="is the wrong length (should be {count, number} {count, plural, one {character} other {characters}})"
          values={{ count: equal }} />
      )
    }
    if (isNumber(max) && value.length > +max) {
      return msg || (
        <FormattedMessage id="form.errors.tooLong"
          defaultMessage="is too long (maximum is {count, number} {count, plural, one {character} other {characters}})"
          values={{ count: max }} />
      )
    }
    if (isNumber(min) && value.length < +min) {
      return msg || (
        <FormattedMessage id="form.errors.tooShort"
          defaultMessage="is too short (minimum is {count, number} {count, plural, one {character} other {characters}})"
          values={{ count: min }} />
      )
    }
  })
})

export default length