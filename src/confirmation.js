import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMessage, prepare } from './helpers';

const DEFAULT_CASE_SENSITIVE = true;

export default function confirmation({
      field,
      fieldLabel,
      caseSensitive,
      message,
      msg,
      'if': ifCond, unless
    }) {
  msg = formatMessage(msg || message);

  caseSensitive = (null != caseSensitive ? caseSensitive : DEFAULT_CASE_SENSITIVE);

  return prepare(ifCond, unless, false, function(value, allValues) {
    let fieldValue = '' + (allValues[field] || '');

    if (caseSensitive ? value !== fieldValue : value.toLowerCase() !== fieldValue.toLowerCase()) {
      return msg || (
        <FormattedMessage id="form.errors.confirmation"
          defaultMessage="doesn't match `{fieldLabel}`"
          values={{ fieldLabel: fieldLabel || field }} />
      );
    }
  });
}