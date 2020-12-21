/*
 * Jira Ticket:
 * Created Date: Thu, 19th Nov 2020, 16:06:48 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { SelectInput, SimpleForm, useNotify, useRedirect } from 'react-admin';
import { ActionButton as RemoveTranslationButton } from 'Components/Buttons';
import { Translate as TranslateIcon } from '@material-ui/icons';
import { MultiLanguageToolbar } from 'Components/Toolbars';
import useDataProviderWrapper from 'hooks/dataProviderWrapper';
import { useFormState, useForm } from 'react-final-form';
import _ from 'lodash';
import recursiveMap from 'utils/recursiveMapReactChildren';
import { multiLangFormStyles } from 'styles';
import { checkNoPropertiesExist } from 'utils/helpers';
import { ReactAdminNotifyError } from 'utils/errors';

const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

const validateNoMissingLocaleFields = ({
  children,
  excludedSources,
  localisations,
  sourcesToSkipRecursion,
}) => {
  let unsetFields = {};
  // check for missing fields - get each field within the multilanguage form
  // (exclude sources from localisation)
  const requiredLocalisedSources = [];
  recursiveMap(
    children,
    ({ props }) => {
      if (
        props &&
        props.source &&
        !excludedSources.includes(props.source) &&
        props.validate &&
        props.validate.isRequired
      ) {
        return requiredLocalisedSources.push(props.source);
      }
    },
    sourcesToSkipRecursion
  );

  if (requiredLocalisedSources && requiredLocalisedSources.length > 0) {
    requiredLocalisedSources.forEach((source) => {
      localisations.forEach((locale) => {
        if (!locale[source])
          unsetFields = {
            source,
            language: languageNames.of(locale.language),
          };
      });
    });
  }
  return unsetFields;
};

const FormChildrenWithLanguageInput = ({
  children,
  defaultLang,
  languages,
  disabled,
  allowLanguageRemoval,
}) => {
  const classes = multiLangFormStyles();
  return [
    <div key="multilang-form-header" className={classes.header}>
      <SelectInput
        key="language"
        source="language"
        defaultValue={defaultLang}
        choices={languages}
        autoFocus
      />
      {disabled || !allowLanguageRemoval ? null : (
        <RemoveTranslationButton
          className={classes.removeTranslation}
          name="multiLang.button.removeTranslation"
          icon={<TranslateIcon />}
        />
      )}
    </div>,
    [children],
  ];
};

const FormChildren = (props) => {
  const {
    children,
    defaultLang,
    excludedSources,
    language,
    setLanguage,
    localisations,
    setLocalisations,
    currentRecord,
    setCurrentRecord,
    setInvalid,
    sources,
    sourcesToSkipRecursion,
    resource,
    cleanOrphaned,
  } = props;

  const form = useForm(); // form methods
  const { values, invalid } = useFormState(); // current values, and form validity in form state

  const currentLocalisation =
    localisations && localisations.length > 0
      ? localisations.find((localisation) => localisation.language === language)
      : {} || {};

  // handler for remove translation button
  const removeCurrentTranslation = () => {
    onChangeLanguage({ target: { value: defaultLang } }); // switch to default lang
    const updatedLocalisations = localisations.filter(
      (localisation) => localisation.language !== language
    );
    setLocalisations(updatedLocalisations);
  };

  const cleanedOrphanedLocalisations = (
    currentLanguage,
    localisations,
    expectedFields = []
  ) => {
    // clean up orphaned localisations (not current language or default language)
    return localisations.filter(
      (localisation) =>
        localisation.language === defaultLang ||
        localisation.language === currentLanguage ||
        !checkNoPropertiesExist(localisation, ['language'], expectedFields)
    );
  };

  // we have to handle richTextInput sources as the Quill editor does not use onBlur (https://github.com/zenoamaro/react-quill/issues/276)
  // quick fix is to wrap the component in a div and pass the "addonblur" prop on the div with the input's source prop
  const onBlur = (event, richTextSource = null) => {
    let updatedLocalisations =
      (localisations &&
        localisations.length > 0 &&
        localisations.map((localisation) => {
          return localisation.language === values.language
            ? _.pick(values, sources)
            : localisation;
        })) ||
      {};

    if (event.target && event.target.name === 'language') {
      if (
        !updatedLocalisations ||
        !updatedLocalisations.find(
          (localisation) => localisation.language === event.target.value
        )
      ) {
        // account for when a localisation does not yet exist
        const newLocalisation = sources.reduce(
          (o, key) => ({
            ...o,
            [key]: key === 'language' ? event.target.value : null, // initalise all fields null with language set
          }),
          {}
        );
        updatedLocalisations.push(newLocalisation);
      } else if (cleanOrphaned) {
        updatedLocalisations = cleanedOrphanedLocalisations(
          event.target.value,
          updatedLocalisations,
          sources
        );
      }
    }

    // updating the record with the non-translated field
    if (
      event &&
      event.currentTarget &&
      excludedSources.includes(event.currentTarget.name)
    ) {
      setCurrentRecord({
        ...currentRecord,
        localisations: updatedLocalisations,
        [event.currentTarget.name]:
          event.currentTarget.type === 'number'
            ? Number(event.currentTarget.value)
            : event.currentTarget.value,
      });
    } else if (richTextSource && event && event.target.innerHTML) {
      setCurrentRecord({
        ...currentRecord,
        localisations: updatedLocalisations,
        [richTextSource]: event.target.innerHTML,
      });
    }

    // pick the current language (take into account that we might have switched languages at this point)
    const theCurrentLocalisation =
      updatedLocalisations && updatedLocalisations.length > 0
        ? updatedLocalisations.find(
            (localisation) =>
              localisation.language ===
              (event.target.name === 'language' ? event.target.value : language)
          )
        : {} || {};

    // multiLanguage sources
    sources.forEach((source) => {
      // always update if language, and only if there is a localisation
      if (source === 'language') {
        form.change('language', language);
      } else if (source && theCurrentLocalisation) {
        form.change(source, theCurrentLocalisation[source]);
      }
    });

    // update the localisations
    setLocalisations(updatedLocalisations);
    // update the prop that's not being passed to simpleform/save button
    setInvalid(invalid);
  };

  const onChangeLanguage = (event) => {
    onBlur(event);
    setLanguage(event.target.value);
  };

  // add our onChange language setter
  const childrenWithLanguageStateListener = recursiveMap(
    children,
    (child) => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (
        isValidElement(child) &&
        (child.type !== 'div' || child.props.addonblur)
      ) {
        const childProps = {
          ...child.props,
          onBlur: (event) => onBlur(event, child.props.addonblur),
          resource,
        };
        // add props for the button
        if (child.props.name === 'multiLang.button.removeTranslation') {
          // do not allow removal of the default language
          if (values.language === defaultLang) {
            childProps.disabled = true;
            return cloneElement(child, childProps);
          }
          childProps.onClick = removeCurrentTranslation;
          return cloneElement(child, childProps);
        }
        if (!excludedSources.includes(child.props.source)) {
          const value = currentLocalisation
            ? currentLocalisation[child.props.source]
            : null; // no localisation data yet
          childProps.value = value;
          childProps.defaultValue = child.props.defaultValue || value;
        } else {
          const value = currentRecord[child.props.source];
          childProps.value = value;
          childProps.defaultValue = child.props.defaultValue || value;
          // set the excluded field props to isEqual evaluate function to always return false
          // this prevents react-final-form from resetting the fields if they were not changed or same as initialValue
          childProps.isEqual = () => false;
        }
        // support custom fields by passing the extra action
        if (child.props.hasOwnProperty('useOnChange'))
          childProps.extraOnChange = onBlur;
        if (child.key === 'language') {
          childProps.onChange = onChangeLanguage;
          childProps.value = language; // make sure the language drop down always has the value selected
          if (language === defaultLang) {
            childProps.disabled = !values[sources[1]] ? true : false; // make sure our default language always has something filled in on its form
          }
        }
        return cloneElement(child, childProps);
      }
      return child;
    },
    sourcesToSkipRecursion
  );

  return childrenWithLanguageStateListener;
};

const MultiLanguageForm = ({
  excludedSources = [],
  defaultLang = 'en',
  hideDelete,
  extendToolbar = 0,
  sourcesToSkipRecursion,
  doRedirect = false,
  supportedLanguages = [],
  allowLanguageRemoval = true,
  cleanOrphaned = true, // cleans out languages that have not yet been set
  ...props
}) => {
  const { disabled, children, resource, record, redirect } = props;
  const callToDataProvider = useDataProviderWrapper();
  const notify = useNotify();
  const redirectTo = useRedirect();
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(defaultLang);
  const [localisations, setLocalisations] = useState(record.localisations); // an array of localisations [{language: 'en', ...fields}, {...localisation}]
  const [currentRecord, setCurrentRecord] = useState(record);
  const [saving, setSaving] = useState(false);
  const [invalid, setInvalid] = useState(false);

  // initialise the language input
  useEffect(() => {
    const initialiseLanguageInput = () => {
      if (supportedLanguages.length === 0) {
        return callToDataProvider({
          type: 'GET_LIST',
          resource: 'language',
          payload: { perPage: 1000 },
          onSuccess: (result) => {
            setLanguages(result.data);
          },
        });
      } else {
        const supportedLanguagesWithCodes = supportedLanguages.map(
          (language) => {
            return {
              id: language,
              code: language,
              name: languageNames.of(language),
            };
          }
        );
        setLanguages(supportedLanguagesWithCodes);
      }
    };
    initialiseLanguageInput();
  }, [callToDataProvider, notify, supportedLanguages]);

  const childrenExtended = FormChildrenWithLanguageInput({
    children,
    defaultLang,
    languages,
    disabled,
    allowLanguageRemoval,
  });

  const sources = [];
  recursiveMap(
    childrenExtended,
    (child) => {
      if (
        child.props &&
        child.props.source &&
        !excludedSources.includes(child.props.source)
      ) {
        return sources.push(child.props.source);
      }
    },
    sourcesToSkipRecursion
  );

  const formProps = {
    children: childrenExtended,
    defaultLang,
    excludedSources,
    language,
    setLanguage,
    localisations,
    setLocalisations,
    currentRecord,
    setCurrentRecord,
    setInvalid,
    sources,
    sourcesToSkipRecursion,
  };

  // let SimpleForm know which localisation we are using
  let languageProps = { ...props };

  if (localisations && localisations.length > 0) {
    const localisation = localisations.find(
      (localisation) => localisation.language === language
    );
    languageProps.record = {
      ...localisation,
      id: record.id,
      orderIndex: record.orderIndex,
    };
    languageProps.id = record.id;
  } else {
    // initialise the form data with the default lang
    const newLocalisation = sources.reduce(
      (o, key) => ({
        ...o,
        [key]: key === 'language' ? defaultLang : currentRecord[key] || null,
      }),
      {}
    );

    // build the form data
    const allSources = [];
    recursiveMap(
      childrenExtended,
      (child) => {
        if (child.props && child.props.source) {
          return allSources.push(child.props.source);
        }
      },
      sourcesToSkipRecursion
    );

    const newRecord = allSources.reduce(
      (o, key) => ({
        ...o,
        [key]:
          key === 'localisations'
            ? { ...newLocalisation }
            : currentRecord[key] || null,
      }),
      {}
    );

    setLocalisations([newLocalisation]);
    setCurrentRecord({
      ...newRecord,
    });
  }

  const handleMultiLanguageSubmit = (values) => {
    try {
      const data = values;
      data.localisations = localisations;
      const invalidLocaleFields = validateNoMissingLocaleFields({
        children: childrenExtended,
        excludedSources,
        localisations,
        sourcesToSkipRecursion,
      });
      if (invalidLocaleFields && invalidLocaleFields.language) {
        throw new ReactAdminNotifyError({
          message: 'error.form.multiLang.missingField',
          payload: invalidLocaleFields,
          undoable: false,
          timeout: 10000,
        });
      }
      setSaving(true);
      return callToDataProvider({
        type: record && record.id ? 'UPDATE' : 'CREATE',
        resource,
        payload: {
          data,
        },
        onSuccess: (result) => {
          setSaving(false);
          if (doRedirect) {
            // handle the redirection request
            let redirectionPath = `/${resource}`;
            if (redirect === 'edit') {
              redirectionPath += `/${result.data.id}`;
            } else if (redirect === 'show') {
              redirectionPath += `/${result.data.id}/show`;
            } else {
              // assume custom path
              redirectionPath += redirect;
            }
            redirectTo(redirectionPath);
          }
        },
        onFailure: () => {
          setSaving(false);
        },
      });
    } catch (error) {
      return notify(
        error.message,
        'warning',
        error.payload,
        error.undoable,
        error.timeout
      );
    }
  };

  return !(languages.length > 0 && localisations.length > 0) ? null : (
    <SimpleForm
      {...languageProps}
      save={handleMultiLanguageSubmit}
      saving={saving}
      toolbar={
        disabled ? null : (
          <MultiLanguageToolbar
            extend={extendToolbar}
            isInvalid={invalid}
            hideDelete={hideDelete}
          />
        )
      }
      initialValuesEqual={() => true} // prevents us losing initialised form values for our reference field
    >
      <FormChildren {...formProps} />
    </SimpleForm>
  );
};

export default MultiLanguageForm;
