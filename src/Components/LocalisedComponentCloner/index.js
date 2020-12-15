/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 16:18:20 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { useTranslate } from 'react-admin';
import { columnStyles } from 'styles';

const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANG.split(' ');

// takes the component you specify and clones it for the number of localisations the app supports
// can allow rendering of each
const LocalisedComponentCloner = ({
  component,
  direction = 'column',
  fullWidth,
  ...props
}) => {
  const { source, record, label, resource } = props;
  const classes = columnStyles(direction, fullWidth ? '100%' : null);
  const translate = useTranslate();

  const children = [];

  var notFoundIndex = supportedLanguages.length;

  for (let i = 0; i < supportedLanguages.length; i++) {
    const language = supportedLanguages[i];

    let initialValue = null;

    let index = i;

    if (record && record.localisations && record.localisations.length > 0) {
      // find the supported language as an existing record
      let existingLanguageIndex = record.localisations
        .map((locale) => locale.language)
        .indexOf(language);
      // if the record exists, match the index
      if (existingLanguageIndex >= 0) {
        index = existingLanguageIndex;
        initialValue = record.localisations[existingLanguageIndex][source];
      } else {
        // if the language does not exist, make sure to set it's position outside of existing records
        index = notFoundIndex;
        notFoundIndex++;
      }
    }
    const fieldLabel = label
      ? translate(label)
      : translate(`resources.${resource}.fields.${source}`);
    children.push(
      <div key={`localisations[${index}].${source}`} className={classes.column}>
        {React.cloneElement(component, {
          ...props,
          source: `localisations[${index}].${source}`,
          label: `${fieldLabel} (${languageNames.of(language)})`,
          initialValue,
          defaultValue: initialValue,
        })}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.column}>{children}</div>
    </div>
  );
};

export default LocalisedComponentCloner;
