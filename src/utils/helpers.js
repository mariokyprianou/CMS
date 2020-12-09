// partition an array based on isValid (e.g. ['apples','oranges'] => isOrange => (false) ['apples'] ; (true) ['oranges'])
export function partition(array, isValid) {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}

export const getLocalisedFieldByLanguage = ({
  language,
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
