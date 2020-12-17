/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 15:13:10 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  Edit,
  Labeled,
  ImageField,
  ImageInput,
  required,
  TextInput,
  useTranslate,
} from 'react-admin';
import { MultiLanguageForm } from 'Components/Forms';
import RichTextInput from 'ra-input-rich-text';
import { notificationTypeChoices, onboardingScreens } from 'utils/choices';
import { columnStyles } from 'styles';

const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANG.split(' ');

const ConfigurationForm = ({ record, translate, ...props }) => {
  const classes = columnStyles('column', '40vw');
  const { data } = record;
  const { resource } = props;
  return (
    <MultiLanguageForm
      {...props}
      record={data}
      supportedLanguages={supportedLanguages}
      allowLanguageRemoval={false}
      extendToolbar={0}
      cleanOrphaned={false}
      sourcesToSkipRecursion={[
        'image_onboarding0',
        'image_onboarding1',
        'image_onboarding2',
        'image_onboarding3',
      ]} // skip nested fields to avoid breaking on recursive children
    >
      <RichTextInput source="termsAndConditions" validation={required()} />
      <RichTextInput source="privacyPolicy" validation={required()} />
      <div className={classes.root}>
        <div className={classes.column}>
          <Labeled label={`resources.${resource}.fields.onboardings`} />
          {onboardingScreens.map((choice) => {
            return (
              <Fragment key={choice.id}>
                <div>{translate(choice.name)}</div>
                <TextInput
                  fullWidth
                  // validate={required()}
                  source={`title_${choice.id}`}
                  label={`resources.${resource}.fields.title`}
                />
                <TextInput
                  fullWidth
                  // validate={required()}
                  source={`description_${choice.id}`}
                  label={`resources.${resource}.fields.description`}
                />
                <ImageInput
                  // validate={required()}
                  source={`image_${choice.id}`}
                  label={`resources.${resource}.fields.image`}
                >
                  <ImageField source="src" title={`img_${choice}`} />
                </ImageInput>
              </Fragment>
            );
          })}
        </div>
        <div className={classes.column}>
          <Labeled label={`resources.${resource}.fields.notifications`} />
          {notificationTypeChoices.map((choice) => {
            return (
              <Fragment key={choice.id}>
                <div>{translate(choice.name)}</div>
                <TextInput
                  fullWidth
                  // validate={required()}
                  source={`title_${choice.id}`}
                  label={`resources.${resource}.fields.title`}
                />
                <TextInput
                  fullWidth
                  // validate={required()}
                  multiline
                  source={`body_${choice.id}`}
                  label={`resources.${resource}.fields.body`}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
    </MultiLanguageForm>
  );
};

const ConfigurationPage = ({ staticContext, ...props }) => {
  const translate = useTranslate();
  return (
    <Edit
      {...props}
      id="configuration"
      basePath="/configuration"
      resource="configuration"
      title="resources.configuration.name"
    >
      <ConfigurationForm translate={translate} />
    </Edit>
  );
};

export default ConfigurationPage;
