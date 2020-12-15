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

const TextByLocalisationField = ({
  parent = null,
  language = 'en',
  source,
  record,
  textVisibleLength,
}) => {
  const classes = longTextStyles(textVisibleLength);

  let recordData = record;
  if (parent) {
    recordData = record[parent];
  }
  const { localisations } = recordData;
  const localisedText = getLocalisedFieldByLanguage({
    language,
    source,
    localisations,
  });

  return (
    <div className={classes.div}>
      <span className={classes.span}>{localisedText}</span>
    </div>
  );
};

export default TextByLocalisationField;
