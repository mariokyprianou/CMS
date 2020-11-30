/*
 * Jira Ticket: PDL-128
 * Created Date: Mon, 30th Nov 2020, 08:37:00 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

const ExerciseCategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput
        source="name"
        label="resources.exerciseCategory.fields.name"
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);

export default ExerciseCategoryEdit;
