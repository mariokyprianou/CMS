/*
 * Jira Ticket:
 * Created Date: Tue, 24th Nov 2020, 16:15:51 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { getLocalisedFieldByLanguage } from 'utils';
import { longTextStyles } from 'styles';
import get from 'lodash/get';

const TextByLocalisationField = ({
  parentPath = null,
  language = 'en',
  source,
  record,
}) => {
  const classes = longTextStyles();

  let recordData = record;
  if (parentPath) {
    recordData = get(record, parentPath);
  }
  const { localisations } = recordData || [];
  const localisedText = getLocalisedFieldByLanguage({
    language,
    source,
    localisations,
  });

  return <div className={classes.root}>{localisedText}</div>;
};

export default TextByLocalisationField;
