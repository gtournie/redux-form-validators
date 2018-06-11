import messages from './messages'
import Validators from './validators'
import { toObjectMsg, prepare, memoize } from './helpers'

export default function addValidator ({ validator, defaultMessage, defaultMsg }) {
  defaultMsg = toObjectMsg(defaultMsg || defaultMessage) || messages.invalid

  return memoize(function (options = {}) {
    let msg = toObjectMsg(options.msg || options.message) || defaultMsg

    return prepare(options.if, options.unless, options.allowBlank, function (...args) {
      let result = validator(options, ...args)
      if (typeof result !== 'boolean') {
        return result ? Validators.formatMessage(result) : null
      }
      if (!result) {
        return Validators.formatMessage(msg)
      }
    })
  })
}
