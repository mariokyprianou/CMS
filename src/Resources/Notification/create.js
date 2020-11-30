/*
 * Jira Ticket: PDL-391
 * Created Date: Mon, 30th Nov 2020, 12:32:11 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  Create,
  TextInput,
  SelectInput,
  SimpleForm,
  required,
  DateTimeInput,
  ReferenceArrayInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { localeChoices } from 'utils/choices';
import { ActionButton } from 'Components/Buttons';
import { Send as icon } from '@material-ui/icons';
import { columnStyles } from 'styles';

const NotificationCreate = ({ staticContext, ...props }) => {
  const resource = 'notification';
  const classes = columnStyles();
  return (
    <Create resource={resource} basePath={`/${resource}`} {...props}>
      <SimpleForm>
        {/* 1st Row - Trainer / DateTime */}
        <div className={classes.root}>
          <div className={classes.column}>
            <ReferenceArrayInput
              // TODO: Need to be able to send to multiple trainers - multi select dropdown
              source="trainer"
              validate={required()}
              resettable
            />
            <DateTimeInput source="dateTime" validate={required()} resettable />
            <SelectInput
              source="language"
              choices={localeChoices}
              validate={required()}
              resettable
            />
          </div>
        </div>

        {/* 2nd Row - Title */}
        <div className={classes.root}>
          <div className={classes.column}>
            <TextInput source="title" validate={required()} resettable />
          </div>
        </div>

        {/* 3rd Row - Text */}
        <RichTextInput source="text" validate={required()} resettable />
        <ActionButton
          name="Send"
          icon={icon}
          onClick={() => console.log('TODO: Hook up')}
          variant="contained"
        />

        {/* 4th Row - List of Scheduled Notifications */}
        {/* TODO: Create List of scheduled Notifications. */}
      </SimpleForm>
    </Create>
  );
};

export default NotificationCreate;
