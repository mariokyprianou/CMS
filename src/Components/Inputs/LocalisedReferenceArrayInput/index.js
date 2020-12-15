/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 10:11:44 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { cloneElement } from 'react';
import { ReferenceArrayInput, useTranslate } from 'react-admin';
import get from 'lodash/get';
import { getLocalisedFieldByLanguage } from 'utils';

const LocalisedChoices = ({
  children,
  choices,
  language = 'en',
  localisedFieldSource = 'name',
  localisationsPath = 'localisations',
  additionalChoices = [],
  additionalChoiceComparisonField,
  ...props
}) => {
  if (!children || Array.isArray(children))
    throw new Error('LocalisedReferenceInput requires a child component');
  const { translate } = props;
  const localisedChoices = choices.map((choice) => {
    let localisedField = `${getLocalisedFieldByLanguage({
      language,
      localisations: get(choice, localisationsPath),
      source: localisedFieldSource,
    })}`;

    if (additionalChoices.length > 0 && additionalChoiceComparisonField) {
      localisedField += ` - ${translate(
        additionalChoices
          .filter(
            (additionalChoice) =>
              additionalChoice.id === choice[additionalChoiceComparisonField]
          )
          .map((field) => field.name)[0]
      )}`;
    }

    return {
      ...choice,
      localisedField,
    };
  });

  return cloneElement(children, {
    ...props,
    optionText: 'localisedField',
    choices: localisedChoices,
  });
};

const LocalisedReferenceArrayInput = ({ children, ...props }) => {
  const translate = useTranslate();
  return (
    <ReferenceArrayInput {...props}>
      <LocalisedChoices children={children} translate={translate} />
    </ReferenceArrayInput>
  );
};

export default LocalisedReferenceArrayInput;
