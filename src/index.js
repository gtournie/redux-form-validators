import React from 'react';
import { FormattedMessage } from 'react-intl';

import absence from './absence';
import acceptance from './acceptance';
import addValidator from './add-validator';
import confirmation from './confirmation';
import date from './date';
import email, { REG_EMAIL } from './email';
import format from './format';
import { inclusion, exclusion } from './inclusion-exclusion';
import length from './length';
import numericality from './numericality';
import presence from './presence';
import url, { REG_URL } from './url';

import { DEFAULT_ALLOW_BLANK } from './helpers';

let required = presence; // alias

export {
  absence,
  acceptance,
  addValidator,
  confirmation,
  date,
  email, REG_EMAIL,
  exclusion,
  format,
  inclusion,
  length,
  numericality,
  presence,
  required,
  url, REG_URL,
  DEFAULT_ALLOW_BLANK
};

// TODO:
// credit card

