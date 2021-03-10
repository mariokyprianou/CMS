/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 16:18:20 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { useTranslate } from 'react-admin';
import { useForm, useFormState } from 'react-final-form';
import { columnStyles } from 'styles';
import get from 'lodash/get';

// TODO: DisplayName not supported in FF

const languageNames = Intl.hasOwnProperty('DisplayNames')
  ? new Intl.DisplayNames(['en'], { type: 'language' })
  : null;
const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANG.split(' ');

// takes the component you specify and clones it for the number of localisations the app supports
// can allow rendering of each
const LocalisedComponentCloner = ({
  component,
  direction = 'column',
  fullWidth,
  parentPath = null,
  defaultValues = [],
  defaultValueFieldName = '',
  ...props
}) => {
  const { source, record, label, resource } = props;
  const classes = columnStyles(direction, fullWidth ? '100%' : null);
  const translate = useTranslate();
  const form = useForm();
  const { values } = useFormState();

  const children = [];

  var notFoundIndex = supportedLanguages.length;

  let recordData = record;

  // handle for some deeply nested fields - e.g. the exercise coaching tips on a workout week
  if (parentPath) {
    recordData = get(record, parentPath);
  }

  for (let i = 0; i < supportedLanguages.length; i++) {
    const language = supportedLanguages[i];

    let defaultValue = null;
    // check if there's a set of default values and a field name to map
    if (defaultValues.length > 0 && defaultValueFieldName) {
      defaultValue = defaultValues.find(
        (localisation) => localisation.language === language
      )[defaultValueFieldName];
    }

    let initialValue = defaultValue;

    let index = i;

    if (
      recordData &&
      recordData.localisations &&
      recordData.localisations.length > 0
    ) {
      // find the supported language as an existing record
      let existingLanguageIndex = recordData.localisations
        .map((locale) => locale.language)
        .indexOf(language);
      // if the record exists, match the index
      if (existingLanguageIndex >= 0) {
        index = existingLanguageIndex;
        initialValue = recordData.localisations[existingLanguageIndex][source];
      } else {
        // if the language does not exist, make sure to set it's position outside of existing records
        index = notFoundIndex;
        notFoundIndex++;
      }
    }

    if (parentPath) {
      const languageSet = get(
        values,
        `${parentPath}.localisations[${index}].language`
      );

      // make sure the language for the index is set
      if (!languageSet || languageSet !== language) {
        form.change(`${parentPath}.localisations[${index}].language`, language);
      }

      const fieldLabel = label
        ? translate(label)
        : translate(`resources.${resource}.fields.${source}`);
      children.push(
        <div
          key={`${parentPath}.localisations[${index}].${source}`}
          className={classes.column}
        >
          {React.cloneElement(component, {
            ...props,
            source: `${parentPath}.localisations[${index}].${source}`,
            label: `${fieldLabel} (${languageNames.of(language)})`,
            initialValue,
            defaultValue: defaultValue || initialValue,
          })}
        </div>
      );
    } else {
      const languageSet = get(values, `localisations[${index}].language`);

      // make sure the language for the index is set
      if (!languageSet || languageSet !== language) {
        form.change(`localisations[${index}].language`, language);
      }

      const fieldLabel = label
        ? translate(label)
        : translate(`resources.${resource}.fields.${source}`);
      children.push(
        <div
          key={`localisations[${index}].${source}`}
          className={classes.column}
        >
          {React.cloneElement(component, {
            ...props,
            source: `localisations[${index}].${source}`,
            label: `${fieldLabel} (${languageNames.of(language)})`,
            initialValue,
            defaultValue: defaultValue || initialValue,
          })}
        </div>
      );
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.column}>{children}</div>
    </div>
  );
};

export default LocalisedComponentCloner;
