/*
 * Jira Ticket: PDL-128
 * Created Date: Thu, 26th Nov 2020, 12:25:48 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';

const ExerciseCategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Create>
);

export default ExerciseCategoryCreate;
