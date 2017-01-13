import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMessage, prepare, DEFAULT_ALLOW_BLANK } from './helpers';


export const INVALID_MSG = (<FormattedMessage id="form.errors.invalid" defaultMessage="is invalid" />);

export default function format({ 'with': wit, without, message, msg, 'if': ifCond, unless, allowBlank=DEFAULT_ALLOW_BLANK }) {
  msg = formatMessage(msg || message);

  return prepare(ifCond, unless, allowBlank, function(value) {
    if ((wit && !value.match(wit)) || (without && value.match(without))) {
      return msg || INVALID_MSG;
    }
  });
}