import Validators from './validators'
import { HAS_PROP } from './helpers'

const CACHE = {}
let VALIDATOR_ID = 0

export default function combine () {
  let args = arguments
  if (!Validators.defaultOptions.memoize) return firstErr(args)
  let keys = []
  for (let i = 0, len = args.length; i < len; ++i) {
    keys.push(args[i]._validatorId || (args[i]._validatorId = ++VALIDATOR_ID))
  }
  let key = keys.sort().join('-')
  return HAS_PROP.call(CACHE, key) ? CACHE[key] : (CACHE[key] = firstErr(args))
}

export function firstErr (arr) {
  return function () {
    for (let i = 0, len = arr.length, err; i < len; ++i) if ((err = arr[i].apply(null, arguments))) return err
  }
}
