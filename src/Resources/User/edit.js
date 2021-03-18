/*
 * Jira Ticket: PDL-270
 * Created Date: Mon, 23rd Nov 2020, 14:24:39 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  BooleanInput,
  Edit,
  FormDataConsumer,
  NumberInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useTranslate,
} from 'react-admin';
import {
  LocalisedReferenceArrayInput,
  // LocalisedReferenceInput,
} from 'Components/Inputs';
import { columnStyles } from 'styles';
import {
  // programmeEnvironmentChoices,
  subscriptionPlatformChoices,
  subscriptionChoices,
  allTimeZones,
} from 'utils/choices';
import { nonNegativeInt, isValidEmail } from 'utils/validation';

const nonNegativeIntValidation = [required(), nonNegativeInt];
const emailValidation = [required(), isValidEmail];

const SanitizedForm = ({ basePath, classes, ...props }) => {
  const translate = useTranslate();
  const { resource, record } = props;

  const helperString = (formData) => {
    if (formData && formData.deviceLimitEnabled) {
      // device limit is enabled (no changing of device for 30 days)
      var countDown = new Date();
      if (!record.deviceLimitEnabled) {
        return 'notification.user.deviceLimitEnabled';
      } else {
        // current limit
        var countDown = new Date(record.deviceLimit);
        return translate('notification.user.currentLimit', { countDown });
      }
    } else {
      // device limit disabled - user will be able to switch
      return 'notification.user.deviceLimitDisabled';
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <TextInput
          resource={resource}
          source="firstName"
          validate={required()}
        />
        <TextInput
          resource={resource}
          source="lastName"
          validate={required()}
        />
        <TextInput
          resource={resource}
          multiline
          source="email"
          validate={emailValidation}
        />
        <ReferenceInput
          resource={resource}
          reference="country"
          source="country.id"
          validate={required()}
        >
          <SelectInput optionText="country" />
        </ReferenceInput>
        <FormDataConsumer>
          {({ formData }) =>
            formData.country &&
            formData.country.id === process.env.REACT_APP_INDIA_ID && (
              <ReferenceInput
                resource={resource}
                reference="region"
                source="region.id"
                validate={required()}
              >
                <SelectInput optionText="region" />
              </ReferenceInput>
            )
          }
        </FormDataConsumer>
        <BooleanInput resource={resource} source="emailMarketing" disabled />
        <SelectInput
          resource={resource}
          source="subscription.type"
          initialValue="AUTOMATIC"
          defaultValue="AUTOMATIC"
          choices={subscriptionChoices}
        />
        <FormDataConsumer>
          {({ formData }) => (
            <BooleanInput
              resource={resource}
              source="subscription.isSubscribed"
              disabled={!(formData.subscription.type === 'MANUAL')}
            />
          )}
        </FormDataConsumer>
        <SelectInput
          resource={resource}
          source="subscription.platform"
          choices={subscriptionPlatformChoices}
        />
      </div>
      <div className={classes.column}>
        {/* TODO: Once decision made (Disable editing of Current Programme/Week) remove the redundant */}
        {/* <LocalisedReferenceInput
          source="currentTrainingProgramme.id"
          reference="programme"
          localisationsPath="trainer.localisations"
          additionalChoices={programmeEnvironmentChoices}
          additionalChoiceComparisonField="environment"
          validate={required()}
          disabled={true}
          resource={resource}
        >
          <SelectInput />
        </LocalisedReferenceInput> */}
        <TextInput
          resource={resource}
          source="currentTrainingProgramme.name"
          multiline
          validate={required()}
          disabled={true}
        />
        <NumberInput
          resource={resource}
          source="currentWeek"
          validate={nonNegativeIntValidation}
          disabled={true}
          min={1}
        />
        <LocalisedReferenceArrayInput
          language="en"
          source="previousTrainers"
          reference="trainer"
          disabled
          resource={resource}
        >
          <SelectArrayInput />
        </LocalisedReferenceArrayInput>
        <FormDataConsumer>
          {({ formData }) => (
            <BooleanInput
              resource={resource}
              source="deviceLimitEnabled"
              helperText={helperString(formData)}
            />
          )}
        </FormDataConsumer>
        <SelectInput
          resource={resource}
          source="timeZone"
          choices={allTimeZones}
          validate={required()}
        />
      </div>
    </div>
  );
};

const UserEdit = (props) => {
  const classes = columnStyles();
  return (
    <Edit mutationMode="pessimistic" {...props}>
      <SimpleForm>
        <SanitizedForm classes={classes} />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
