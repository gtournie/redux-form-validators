import React from 'react'
import { FormattedMessage } from 'react-intl'
import { regFormat } from './helpers'

export var REG_URL = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

// To be extracted by react-intl
const URL_ERROR = (<FormattedMessage id="form.errors.url" defaultMessage="is not a valid URL" />)

// Uses "format" internally which is already memoized
let url = function (options) {
  options = Object.assign({}, options)
  var reg = REG_URL
  var protocols = options.protocols || options.protocol
  if (protocols) {
    reg = new RegExp(REG_URL.source.replace('https?|ftp', [].concat(protocols).join('|')), REG_URL.flags)
  }
  return regFormat(options, reg, URL_ERROR)
}

export default url
