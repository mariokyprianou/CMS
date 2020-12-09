/*
 * Jira Ticket:
 * Created Date: Tue, 24th Nov 2020, 16:15:51 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';

const LocalisedTextField = ({
  classes,
  locale = 'English',
  source,
  record,
}) => {
  const { localisations } = record;
  let localisedText;
  if (localisations && localisations.length > 0) {
    const localisation = localisations.find(
      (localisation) => localisation.locale === locale
    );
    localisedText = localisation[source];
  }
  return (
    <div className={classes.div}>
      <span className={classes.span}>{localisedText}</span>
    </div>
  );
};

export default LocalisedTextField;
