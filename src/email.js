import messages from './messages'
import { regFormat } from './helpers'

const REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

// Uses "format" internally which is already memoized
let email = function (options) {
  return regFormat(Object.assign({}, options), REG_EMAIL, messages.email)
}

email.REG_EMAIL = REG_EMAIL

export default email