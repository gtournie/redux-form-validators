[![npm version](https://img.shields.io/npm/v/redux-form-validators.svg?style=flat-square)](https://www.npmjs.com/package/redux-form-validators)
[![npm downloads](https://img.shields.io/npm/dm/redux-form-validators.svg?style=flat-square)](https://www.npmjs.com/package/redux-form-validators)


# redux-form-validators

Simple validations with redux-form. Heavily inspired by the rails validations.

## Installation
```npm install redux-form-validators```

> Note: For internationalization purposes, this package depends on [react-intl](https://github.com/yahoo/react-intl).

## How to use

If you're already familiar with [redux-form](http://redux-form.com/) it should be pretty straight forward.

### Field validation

[This example](http://redux-form.com/6.4.3/examples/fieldLevelValidation/) shows you how to set field level validation with redux-form.
Thanks to `redux-form-validators`, you only have to pass the validators needed:

```
import { required, email } from 'redux-form-validators';

<Field name="email" type="email" label="Email" component={renderField} 
    validate={[required(), email()]} />
```

That's it! =)

### Sync validation

Let's replace the validate function of [this redux-form example](http://redux-form.com/6.4.3/examples/syncValidation/):


```
const TOO_YOUNG_ERROR = (
  <FormattedMessage id="form.errors.tooYoug"
      defaultMessage="Sorry, you must be at least 18 years old">
);

validations = {
  username: [required(), length({ max: 15 })],
  email:    [required(), email()],
  age:      [
    required(), 
    numericality({ int: true }), 
    numericality({ '<': 18, msg: TOO_YOUNG_ERROR })
  ]
}

// Reusable with any other form
validate = (values) => {
  const errors = {};
  for (let field of validations) {
    let value = values[field];
    errors[field] = validations[field].find(validateField => validateField(value));
  }
  return errors;
}

```

## Documentation

### acceptance

This method validates that a checkbox on the user interface was checked. This is typically used when the user needs to agree to your application's terms of service, confirm that some text is read, or any similar concept.

```
<Field name="terms" type="checkbox" label="I accept the terms of service" 
    component={renderField} validate={acceptance()} />
```

The default error message for this helper is "must be accepted". You can also pass custom message via the message option.

It can also receive an `accept` option, which determines the allowed values that will be considered as accepted. It defaults to ['1', 'true'] and can be easily changed (via the `msg` or `message` parameter).

```
acceptance({ accept: 'yes' })
acceptance({ accept: ['TRUE', 'accepted'] })
```

### confirmation

You should use this helper when you have two text fields that should receive exactly the same content. For example, you may want to confirm an email address or a password.

```
<Field name="pass" type="password" label="Password" component={renderField} />
<Field name="confirmation" type="password" label="Confirmation" component={renderField} 
    validate={confirmation({ field: 'pass', fieldLabel: 'Password' })} />
```

The confirmation constraint is case sensitive. 
The default error message for this helper is "doesn't match ${fieldLabel || field}".


### exclusion

Validates that the value is not included in a given set.

```
<Field name="subdomain" type="text" label="Subdomain" component={renderField} 
    validate={exclusion({ in: ['www', 'us', 'ca'] })} />
```

The exclusion helper has an option `in` that receives the set of values that will not be accepted for the validated attributes. The `in` option has an alias called `within` that you can use for the same purpose, if you'd like to.

The default error message is "${value} is reserved".


### format

Validates the value by testing whether it match a given regular expression, which is specified using the `with` option.

```
const ALPHA_ERROR = <FormattedMessage id="form.errors.alpha"
      defaultMessage="Only allows letters">
 
<Field name="legacyCode" type="text" label="Legacy Code" component={renderField} 
    validate={format({ with: /^[a-z]+$/i, message: ALPHA_ERROR })} />
```

The default error message is "is invalid".


### inclusion

Validates that the value is included in a given set.

```
<Field name="size" type="text" label="Size" component={renderField} 
    validate={inclusion({ in: ['small', 'medium', 'large'] })} />
```

The inclusion helper has an option `in` that receives the set of values that will be accepted. The `in` option has an alias called `within` that you can use for the same purpose, if you'd like to.

The default error message for this helper is "is not included in the list".


### length

Validates the length of the attributes' values. It provides a variety of options, so you can specify length constraints in different ways:

```
<Field name="name" type="text" label="Name" component={renderField} 
    validate={length({ min: 2 })} />
    
<Field name="bio" type="text" label="Bio" component={renderField} 
    validate={length({ max: 500 })} />

<Field name="reg_num" type="text" label="Registration Number" component={renderField} 
    validate={length({ is: 6 })} />
```

The possible length constraint options are:

* `min` (or `minimum`) - The value cannot have less than the specified length.
* `max` (or `maximum`) - The value cannot have more than the specified length.
* `is` (or `=`) - The value length must be equal to the given value.

The default error messages depend on the type of length validation being performed. You can personalize these messages using the `wrongLength`, `tooLong`, and `tooShort` options and ${count} as a placeholder for the number corresponding to the length constraint being used. You can still use the `msg` (or `message`) option to specify an error message (don't forget to pluralize it).


### numericality

Validates that your value have only numeric values. By default, it will match an optional sign followed by an integral or floating point number. To specify that only integral numbers are allowed set `int` (or `integer`) to true.

```
<Field name="points" type="text" label="Points" component={renderField} 
    validate={numericality()} />
    
<Field name="games" type="text" label="Games played" component={renderField} 
    validate={numericality({ int: true })} />
```

Besides `int`, this validator also accepts the following options to add constraints to acceptable values:

* `>` (or `greaterThan`) - Specifies the value must be greater than the supplied value. The default error message for this option is "must be greater than %{count}".
* `>=` (or `greaterThanOrEqualTo`) - Specifies the value must be greater than or equal to the supplied value. The default error message for this option is "must be greater than or equal to %{count}".
* `=` (or `equalTo`) - Specifies the value must be equal to the supplied value. The default error message for this option is "must be equal to %{count}".
* `<` (or `lessThan`) - Specifies the value must be less than the supplied value. The default error message for this option is "must be less than %{count}".
* `<=` (or `lessThanOrEqualTo`) - Specifies the value must be less than or equal to the supplied value. The default error message for this option is "must be less than or equal to %{count}".
* `odd` - Specifies the value must be an odd number if set to true. The default error message for this option is "must be odd".
* `even` - Specifies the value must be an even number if set to true. The default error message for this option is "must be even".

The default error message is "is not a number".


### required (alias: presence)

Validates that the specified value is not empty. It uses the `trim()` method to check if the value is a blank string, that is, a string that is either empty or consists of whitespace.

```
<Field name="login" type="text" label="Login" component={renderField} 
    validate={required()} />
```

The default error message is "is required".


### absence

Validates that the specified value are absent. It uses the `!trim()` method to check if the value is not a blank string, that is, a string that is either empty or consists of whitespace.

```
<Field name="name" type="text" label="Name" component={renderField} 
    validate={absence()} />
```

The default error message is "must be blank".


### Common validation options

#### allowBlank

This option will let validation pass if the value is blank, like an empty string for example.

```
<Field name="name" type="text" label="Name" component={renderField} 
    validate={length({ '=': 5, allowBlank: true })} />
```

Not available for: required, absence, acceptance & confirmation.

#### message (alias: msg)

As you've already seen, the `message` option lets you specify the message that will be added to the errors collection when validation fails. When this option is not used, `redux-form-validators` will use the respective default error message for each validator. The `message` option accepts a String, a Hash or a [FormattedMessage](https://github.com/yahoo/react-intl/wiki/Components#string-formatting-components).

```
const ALPHA_ERROR = <FormattedMessage id="form.errors.alpha"
      defaultMessage="Letters only">
 
format({ with: /^[a-z]+$/i, message: ALPHA_ERROR })
format({ with: /^[a-z]+$/i, message: { id: 'form.errors' } })
format({ with: /^[a-z]+$/i, message: 'form.errors' })
format({ with: /^[a-z]+$/i, message: { id: 'form.errors', defaultMessage: 'Letters only' } })
```

Or alternatively, if you don't care about i18n:

```
format({ with: /^[a-z]+$/i, message: 'Letters only' })
```

This will be wrapped in a FormattedMessage (with the message as id), look for a message with this id and will finally fallback to the id.


### Conditional validation

#### Using a function with `if` and `unless`

Finally, it's possible to associate `if` and `unless` with a function which will be called. Using a function gives you the ability to write an inline condition instead of a separate method. This option is best suited for one-liners.

```
<Field name="surname" type="text" label="Surname" component={renderField} 
    validate={presence({ if: (value, values) => { return '' !== values.name } })} />
```


### Adding a validator


```
const ALPHA_ERROR = <FormattedMessage id="form.errors.alpha"
      defaultMessage="Letters only">

const alphaValidator = addValidator({
  defaultMessage: ALPHA_ERROR,
  validator:  function(options, value) {
    return (options.lowerCase ? /^[a-z]+$/ : /^[a-z]+$/i).test(value);
  }
});

<Field name="name" type="text" label="Name" component={renderField} 
    validate={alphaValidator({ lowerCase: true, allowBlank: true })} />
```

`defaultMessage` accepts a String, a Hash or a [FormattedMessage](https://github.com/yahoo/react-intl/wiki/Components#string-formatting-components). See the `message` option.

> Note: you'll still be able to use the common options (`message` & `allowBlank`) and the conditional validation (`if` and `unless`);


## Example

To run the example project you need to clone the repo and run npm i -d && npm start





