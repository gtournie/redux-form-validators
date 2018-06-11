import { regFormat } from './helpers'

// eslint-disable-next-line no-useless-escape
const REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

// Uses "regFormat" internally which is already memoized
let email = regFormat(function () {
  return REG_EMAIL
}, 'email')

email.REG_EMAIL = REG_EMAIL

export default email
