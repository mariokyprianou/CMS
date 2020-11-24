/*
 * Jira Ticket: PDL-271
 * Created Date: Tue, 24th Nov 2020, 09:10:00 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';

const AdministratorCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="email" validate={required()} />
    </SimpleForm>
  </Create>
);

export default AdministratorCreate;
