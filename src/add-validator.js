import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMessage, prepare, DEFAULT_ALLOW_BLANK } from './helpers';
import { INVALID_MSG } from './format';


export default function addValidator({ validator, defaultMessage, defaultMsg }) {
  defaultMsg = formatMessage(defaultMsg || defaultMessage) || INVALID_MSG;

  return function(options={}) {
    options = Object.assign({}, options);
    let blankAllowed = (null == options.allowBlank ? DEFAULT_ALLOW_BLANK : options.allowBlank);
    delete options.allowBlank;

    let msg = formatMessage(options.msg || options.message) || defaultMsg;

    return prepare(options.if, options.unless, blankAllowed, function(value, allValues) {
      if (!validator(options, value, allValues)) {
        return msg;
      }
    });
  };
}