/*
 * Jira Ticket: PDL-274
 * Created Date: Tue, 24th Nov 2020, 13:04:42 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';

const TrainerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <LocalisedComponentCloner
        component={<TextInput validate={required()} />}
        source="name"
        label="resources.trainer.fields.trainer"
      />
    </SimpleForm>
  </Create>
);

export default TrainerCreate;
