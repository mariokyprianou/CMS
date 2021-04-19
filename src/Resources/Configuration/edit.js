/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 15:13:10 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  Edit,
  Labeled,
  ImageField,
  ImageInput,
  required,
  TextInput,
  useTranslate,
  useNotify,
} from 'react-admin';
import { MultiLanguageForm } from 'Components/Forms';
import { Divider, Typography } from '@material-ui/core';
import RichTextInput from 'ra-input-rich-text';
import { notificationTypeChoices, onboardingScreens } from 'utils/choices';
import { maxImageSize } from 'utils/helpers';
import { columnStyles } from 'styles';
import { onDropRejected as onFileDropRejected } from 'utils';

const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANG.split(' ');

const ConfigurationForm = ({ record, translate, ...props }) => {
  const classes = columnStyles('column', '40vw');
  const { data } = record;
  const { resource } = props;
  const notify = useNotify();
  return (
    <MultiLanguageForm
      {...props}
      record={data}
      supportedLanguages={supportedLanguages}
      allowLanguageRemoval={false}
      extendToolbar={0}
      sourcesToSkipRecursion={[
        'image_onboarding0',
        'image_onboarding1',
        'image_onboarding2',
        'image_onboarding3',
      ]} // skip nested fields to avoid breaking on recursive children
    >
      <div addonblur="termsAndConditions">
        <RichTextInput source="termsAndConditions" validate={required()} />
      </div>
      <div addonblur="privacyPolicy">
        <RichTextInput source="privacyPolicy" validate={required()} />
      </div>
      <div className={classes.root}>
        <div className={classes.column}>
          <Labeled label={`resources.${resource}.fields.onboardings`} />
          {onboardingScreens.map((choice) => {
            return (
              <div key={choice.id} className={classes.section}>
                <Typography variant="h6" className={classes.title}>
                  {translate(choice.name)}
                </Typography>
                <TextInput
                  fullWidth
                  validate={required()}
                  source={`title_${choice.id}`}
                  label={`resources.${resource}.fields.title`}
                />
                <div addonblur={`image_${choice.id}`} className={classes.image}>
                  <ImageInput
                    accept="image/*"
                    maxSize={maxImageSize}
                    validate={required()}
                    source={`image_${choice.id}`}
                    label={`resources.${resource}.fields.image`}
                    options={{
                      onDropRejected: (files) =>
                        onFileDropRejected({
                          files,
                          translate,
                          notify,
                          maxFileSize: maxImageSize,
                        }),
                    }}
                  >
                    <ImageField source="url" title={`img_${choice.name}`} />
                  </ImageInput>
                </div>
                <TextInput
                  fullWidth
                  validate={required()}
                  source={`description_${choice.id}`}
                  label={`resources.${resource}.fields.description`}
                />
                <Divider className={classes.divider} />
              </div>
            );
          })}
        </div>
        <div className={classes.column}>
          <Labeled label={`resources.${resource}.fields.notifications`} />
          {notificationTypeChoices.map((choice) => {
            return (
              <div key={choice.id} className={classes.section}>
                <Typography variant="h6" className={classes.title}>
                  {translate(choice.name)}
                </Typography>
                <TextInput
                  fullWidth
                  validate={required()}
                  source={`title_${choice.id}`}
                  label={`resources.${resource}.fields.title`}
                />
                <TextInput
                  fullWidth
                  validate={required()}
                  multiline
                  source={`body_${choice.id}`}
                  label={`resources.${resource}.fields.body`}
                />
                <Divider className={classes.divider} />
              </div>
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
