/*
 * Jira Ticket: PDL-274
 * Created Date: Tue, 24th Nov 2020, 13:04:37 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';

const TrainerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <LocalisedComponentCloner
        component={<TextInput validate={required()} />}
        source="name"
        label="resources.trainer.fields.trainer"
      />
    </SimpleForm>
  </Edit>
);

export default TrainerEdit;
