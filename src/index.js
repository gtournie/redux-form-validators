import absence from './absence'
import acceptance from './acceptance'
import addValidator from './add-validator'
import confirmation from './confirmation'
import date from './date'
import email from './email'
import file, { formatSize } from './file'
import format from './format'
import inclusion from './inclusion'
import exclusion from './exclusion'
import length from './length'
import messages from './messages'
import numericality from './numericality'
import presence from './presence'
import url from './url'

import { formatMsg as formatMessage, getOptions, setOptions } from './helpers'

let required = presence // alias

export default {
  formatMessage,
  formatSize,
  getOptions,
  setOptions,
  messages
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


