import assert from 'assert'
import { combine, required, email, confirmation } from '../index'
import getErrorId from './helper'

const ERROR_PRESENCE = 'form.errors.presence'
const ERROR_EMAIL = 'form.errors.email'

describe('combine', function () {
  it('should combine validators', function () {
    assert.strictEqual(ERROR_PRESENCE, getErrorId(combine(required(), email())('')))
    assert.strictEqual(ERROR_EMAIL, getErrorId(combine(required(), email())('foo')))

    assert.ok(!combine(confirmation({ field: 'pass.password' }))('foo', { pass: { password: 'foo' } }))
    assert.ok(!combine(required(), email())('foo@bar.net'))
  })
})
