/*
 * Jira Ticket: PDL-270
 * Created Date: Mon, 23rd Nov 2020, 14:24:39 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  FormDataConsumer,
  ReferenceInput,
  required,
  NumberInput,
} from 'react-admin';
import { columnStyles } from 'styles';
import {
  subscriptionPlatformChoices,
  countryChoices,
  regionChoices,
  timeZoneChoices,
} from 'utils/choices';

const UserEdit = (props) => {
  const classes = columnStyles();
  return (
    <Edit {...props}>
      <SimpleForm>
        <div className={classes.root}>
          <div className={classes.column}>
            <TextInput source="givenName" validate={required()} />
            <TextInput source="familyName" validate={required()} />
            <TextInput source="email" validate={required()} />
            <SelectInput
              source="country"
              choices={countryChoices}
              validate={required()}
            />
            <FormDataConsumer>
              {({ formData }) =>
                formData.country === 'India' && (
                  <SelectInput
                    source="region"
                    choices={regionChoices}
                    validate={required()}
                  />
                )
              }
            </FormDataConsumer>
            <BooleanInput
              label="resources.user.fields.subscription.isSubscribed"
              source="subscription.isSubscribed"
              disabled
            />
            <SelectInput
              label="resources.user.fields.subscription.platform"
              source="subscription.platform"
              choices={subscriptionPlatformChoices}
            />
          </div>
          <div className={classes.column}>
            <ReferenceInput
              source="trainer"
              reference="trainer"
              validate={required()}
            >
              <SelectInput optionText="localisations[0].name" />
            </ReferenceInput>
            <NumberInput source="currentWeek" validate={required()} min={1} />
            <TextInput source="previousTrainers" multiline disabled />
            <BooleanInput
              label="resources.user.fields.canChangeDevice"
              source="canChangeDevice"
            />
            <SelectInput
              source="timeZone"
              choices={timeZoneChoices}
              validate={required()}
            />
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
