import { toObjectMsg, formatMsg, prepare, memoize, getMessages } from './helpers'


export default function addValidator ({ validator, defaultMessage, defaultMsg }) {
  defaultMsg = toObjectMsg(defaultMsg || defaultMessage) || getMessages().invalid

  return memoize(function (options={}) {
    let msg = toObjectMsg(options.msg || options.message) || defaultMsg

    return prepare(options.if, options.unless, options.allowBlank, function (...args) {
      let result = validator(options, ...args)
      if ('boolean' !== typeof result) {
        return result ? formatMsg(result) : null
      }
      if (!result) {
        return formatMsg(msg)
      }
    })
  })
}