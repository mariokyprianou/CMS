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
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { columnStyles } from 'styles';
import { getLocalisedFieldByLanguage } from 'utils';
import {
  subscriptionPlatformChoices,
  countryChoices,
  regionChoices,
  timeZoneChoices,
} from 'utils/choices';

const TrainerChoices = ({ choices, ...props }) => {
  const enChoices = choices.map((choice) => {
    return {
      ...choice,
      enName: getLocalisedFieldByLanguage({
        language: 'en',
        localisations: choice.localisations,
        source: 'name',
      }),
    };
  });
  return (
    <SelectArrayInput {...props} optionText="enName" choices={enChoices} />
  );
};

const SanitizedForm = ({ basePath, classes, ...props }) => {
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
        <SelectInput
          resource={resource}
          source="country"
          choices={countryChoices}
          validate={required()}
        />
        <FormDataConsumer>
          {({ formData }) =>
            formData.country === 'India' && (
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
        <ReferenceInput
          resource={resource}
          source="trainer"
          reference="trainer"
          validate={required()}
        >
          <SelectInput optionText="localisations[0].name" />
        </ReferenceInput>
        {/* TODO: add currentWeek validation, int > 0 */}
        <NumberInput
          resource={resource}
          source="currentTrainerProgram.currentWeek"
          validate={required()}
          min={1}
        />
        <ReferenceArrayInput
          resource={resource}
          reference="trainer"
          source="previousTrainers"
          label={`resources.${resource}.fields.previousTrainers`}
          disabled
        >
          <TrainerChoices />
        </ReferenceArrayInput>
        <BooleanInput resource={resource} source="canChangeDevice" />
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
