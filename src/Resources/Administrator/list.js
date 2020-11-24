/*
 * Jira Ticket: PDL-271
 * Created Date: Tue, 24th Nov 2020, 08:38:52 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import AdministratorFilter from './filters';

const AdministratorList = (props) => (
  <List filters={<AdministratorFilter />} {...props}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

export default AdministratorList;
