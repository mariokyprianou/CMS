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
} from 'react-admin';
import {
  LocalisedReferenceArrayInput,
  LocalisedReferenceInput,
} from 'Components/Inputs';
import { columnStyles } from 'styles';
import {
  programmeEnvironmentChoices,
  subscriptionPlatformChoices,
  subscriptionChoices,
  allTimeZones,
} from 'utils/choices';
import { nonNegativeInt } from 'utils/validation';

const nonNegativeIntValidation = [required(), nonNegativeInt];

const SanitizedForm = ({ basePath, classes, translate, ...props }) => {
  const { resource } = props;
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
        <TextInput resource={resource} source="email" validate={required()} />
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
                source="region"
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
        {/* Disable editing of Current Programme/Week */}
        <LocalisedReferenceInput
          source="currentTrainerProgram.id"
          reference="programme"
          localisationsPath="trainer.localisations"
          additionalChoices={programmeEnvironmentChoices}
          additionalChoiceComparisonField="environment"
          validate={required()}
          disabled={true}
          resource={resource}
        >
          <SelectInput />
        </LocalisedReferenceInput>
        <NumberInput
          resource={resource}
          source="currentTrainerProgram.currentWeek"
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
        <BooleanInput resource={resource} source="canChangeDevice" />
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
    <Edit mutationMode="optimistic" {...props}>
      <SimpleForm>
        <SanitizedForm classes={classes} />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
