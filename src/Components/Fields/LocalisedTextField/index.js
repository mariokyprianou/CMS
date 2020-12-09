/*
 * Jira Ticket:
 * Created Date: Tue, 24th Nov 2020, 16:15:51 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { getLocalisedFieldByLanguage } from 'utils';

const TextByLocalisationField = ({
  classes,
  language = 'en',
  source,
  record,
}) => {
  const { localisations } = record;
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
