import Validators from './validators'
import { prepareMsg, prepare, memoize, stringToReg } from './helpers'

// eslint-disable-next-line no-useless-escape
const REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i

let email = memoize(function ({ domainWhitelist, domainBlacklist, message, msg, if: ifCond, unless, allowBlank } = {}) {
  msg = msg || message
  domainWhitelist = prepareList(domainWhitelist)
  domainBlacklist = prepareList(domainBlacklist)

  return prepare(ifCond, unless, allowBlank, function (value) {
    let match = value.match(REG_EMAIL)
    if (!match) {
      return Validators.formatMessage(prepareMsg(msg, 'email', 'invalid'))
    }
    let domain = match[1].toLowerCase()
    if (
      (domainWhitelist && !domainInList(domain, domainWhitelist)) ||
      (domainBlacklist && domainInList(domain, domainBlacklist))
    ) {
      return Validators.formatMessage(prepareMsg(msg, 'emailDomain', 'domain', { domain: domain }))
    }
  })
})

email.REG_EMAIL = REG_EMAIL

export default email

// private
function domainInList (domain, list) {
  return list.some(d => (typeof d === 'string' ? d === domain : d.test(domain)))
}

function prepareList (list) {
  return list ? list.map(d => (d.indexOf('*') < 0 ? d.toLowerCase() : stringToReg(d))) : list
}
