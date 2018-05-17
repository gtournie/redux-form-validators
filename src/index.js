import absence from './absence'
import acceptance from './acceptance'
import addValidator from './add-validator'
import confirmation from './confirmation'
import date from './date'
import email from './email'
import file from './file'
import format from './format'
import inclusion from './inclusion'
import exclusion from './exclusion'
import length from './length'
import numericality from './numericality'
import presence from './presence'
import url from './url'

import { getOptions, setOptions, getMessages, setMessages, getFormatMessage, setFormatMessage, getFormatSize, setFormatSize } from './helpers'

let required = presence // alias

export default {
  getFormatMessage,
  setFormatMessage,
  getOptions,
  setOptions,
  getMessages,
  setMessages,
  getFormatSize,
  setFormatSize
}

export {
  absence,
  acceptance,
  addValidator,
  confirmation,
  date,
  email,
  exclusion,
  file,
  format,
  inclusion,
  length,
  numericality,
  presence,
  required,
  url
}
