/*
 * Jira Ticket: PDL-272
 * Created Date: Tue, 24th Nov 2020, 12:26:25 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const AdministratorEdit = (props) => (
  <Edit mutationMode="optimistic" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export default AdministratorEdit;
