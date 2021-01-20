/*
 * Jira Ticket:
 * Created Date: Mon, 23rd Nov 2020, 12:42:51 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import get from 'lodash/get';

// partition an array based on isValid (e.g. ['apples','oranges'] => isOrange => (false) ['apples'] ; (true) ['oranges'])
export function partition(array, isValid) {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}

export const maxImageSize = 2500000; // 2.5MB

export const getLocalisedFieldByLanguage = ({
  language = 'en',
  source,
  localisations,
  format,
  defaultValue = null,
}) => {
  let localisedField = null;
  if (localisations && localisations.length > 0) {
    const localisation = localisations.find(
      (localisation) => localisation.language === language
    );
    localisedField = localisation && localisation[source];
  } else {
    localisedField = defaultValue;
  }
  if (format) {
    // apply the desired formatting
    localisedField = format(localisedField);
  }
  return localisedField;
};

export const sortArray = (a, b, field) => {
  const first = get(a, field);
  const second = get(b, field);
  if (first === undefined || second === undefined) return -1; // handle undefined
  if (first < second) {
    return -1;
  }
  if (first > second) {
    return 1;
  }
  return 0;
};

export const checkNoPropertiesExist = (
  obj = {},
  fieldsToSkip = [],
  fields = []
) => {
  if (fields.length > 0) {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (!fieldsToSkip.includes(field) && obj.hasOwnProperty(field)) {
        if (obj[field] && obj[field] != null && obj[field] !== '') return false; // a property exists
      }
    }
  }
  return true; // all properties are empty
};
