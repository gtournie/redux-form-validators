import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMessage, prepare, DEFAULT_ALLOW_BLANK } from './helpers';


export default function presence({ message, msg, 'if': ifCond, unless }={}) {
  msg = formatMessage(msg || message)
    || <FormattedMessage id="form.errors.presence" defaultMessage="is required" />;

  return prepare(ifCond, unless, false, function(value) {
    if (!value.trim()) {
      return msg;
    }
  });
}


