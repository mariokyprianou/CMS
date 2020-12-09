/*
 * Jira Ticket: PDL-274
 * Created Date: Tue, 24th Nov 2020, 13:04:37 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

const TrainerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput
        source="localisations[0].name"
        label="resources.trainer.fields.trainerEnglish"
        validate={required()}
      />
      <TextInput
        source="localisations[1].name"
        label="resources.trainer.fields.trainerHindi"
        validate={required()}
      />
      <TextInput
        source="localisations[2].name"
        label="resources.trainer.fields.trainerUrdu"
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);

export default TrainerEdit;
