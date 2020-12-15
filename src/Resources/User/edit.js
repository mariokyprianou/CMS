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
  countryChoices,
  regionChoices,
  timeZoneChoices,
} from 'utils/choices';

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
        {/* TODO: probably needs to be a referenceinput */}
        <SelectInput
          resource={resource}
          source="country"
          choices={countryChoices}
          validate={required()}
        />
        <FormDataConsumer>
          {({ formData }) =>
            formData.country === 'India' && (
              // TODO: probably needs to be a referenceinput
              <SelectInput
                resource={resource}
                source="region"
                choices={regionChoices}
                validate={required()}
              />
            )
          }
        </FormDataConsumer>
        <BooleanInput
          resource={resource}
          label="resources.user.fields.subscription.isSubscribed"
          source="subscription.isSubscribed"
          disabled
        />
        <SelectInput
          resource={resource}
          label="resources.user.fields.subscription.platform"
          source="subscription.platform"
          choices={subscriptionPlatformChoices}
        />
      </div>
      <div className={classes.column}>
        <LocalisedReferenceInput
          source="currentTrainerProgram.id"
          reference="programme"
          localisationsPath="trainer.localisations"
          additionalChoices={programmeEnvironmentChoices}
          additionalChoiceComparisonField="environment"
          validate={required()}
          resource={resource}
        >
          <SelectInput />
        </LocalisedReferenceInput>
        {/* TODO: add currentWeek validation, int > 0 */}
        <NumberInput
          resource={resource}
          source="currentTrainerProgram.currentWeek"
          validate={required()}
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
        {/* TODO: needs to be a referenceinput */}
        <SelectInput
          resource={resource}
          source="timeZone"
          choices={timeZoneChoices}
          validate={required()}
        />
      </div>
    </div>
  );
};

const UserEdit = (props) => {
  const classes = columnStyles();
  return (
    <Edit {...props}>
      <SimpleForm>
        <SanitizedForm classes={classes} />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
