import { inclusionExclusion } from './inclusion'
import { memoize } from './helpers'

let exclusion = memoize(function (options) {
  return inclusionExclusion(false, options)
})

export default exclusion
