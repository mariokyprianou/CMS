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
  TextField,
  TextInput,
  BooleanInput,
  SelectInput,
} from 'react-admin';
import { columnStyles } from 'styles';
import { subscriptionPlatformChoices } from 'utils/choices';

// TODO: Update the sources for the second column of inputs.
// https://thedistance.atlassian.net/wiki/spaces/PDL/pages/2026242085/2.1+User+Management

const UserEdit = (props) => {
  const classes = columnStyles();

  return (
    <Edit {...props}>
      <SimpleForm>
        <div className={classes.root}>
          <div className={classes.column}>
            <TextInput source="givenName" />
            <TextInput source="familyName" />
            <TextInput source="email" />
            <TextInput source="country" />
            <TextInput
              // TODO: Should only appear if Country === India
              source="region"
            />
            <BooleanInput source="subscription.isSubscribed" disabled />
            <SelectInput
              source="subscription.platform"
              choices={subscriptionPlatformChoices}
            />
          </div>
          <div className={classes.column}>
            <TextInput source="currentTrainer" />
            <TextInput source="currentWeek" />
            <TextInput source="previousTrainers" multiline disabled />
            <TextInput source="deviceLimit" />
            <TextInput source="timeZone" />
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
