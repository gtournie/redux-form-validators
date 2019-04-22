import assert from 'assert'
import { validateForm, required, email, length } from '../index'
import getErrorId from './helper'

const ERROR_PRESENCE = 'form.errors.presence'
const ERROR_EMAIL = 'form.errors.email'
const ERROR_LENGTH = 'form.errors.tooShort'

const VALIDATIONS = {
  name: required(),
  empty: null, // Ensure it doesn't throw an error
  email: [required(), email()],
  pass: {
    password: [required(), length({ min: 8 })]
  },
  foo: {
    bar: {
      stuff: required(),
      thing: [required(), email()]
    }
  }
}

const VALUES = {
  name: '',
  email: 'foo',
  pass: {
    password: 'abc'
  },
  foo: {
    bar: {
      stuff: '',
      thing: 'foo'
    }
  }
}

describe('validate-form', function () {
  it('should return errors', function () {
    let errors = validateForm(VALIDATIONS)(VALUES)
    assert.strictEqual(ERROR_PRESENCE, getErrorId(errors.name))
    assert.strictEqual(ERROR_EMAIL, getErrorId(errors.email))
    assert.strictEqual(ERROR_LENGTH, getErrorId(errors.pass.password))
    assert.strictEqual(ERROR_PRESENCE, getErrorId(errors.foo.bar.stuff))
    assert.strictEqual(ERROR_EMAIL, getErrorId(errors.foo.bar.thing))
  })
})
