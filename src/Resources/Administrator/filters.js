/*
 * Jira Ticket: PDL-271
 * Created Date: Tue, 24th Nov 2020, 08:46:20 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput } from 'react-admin';

// TODO: Add filter functionality.

const AdministratorFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput source="email" />
    </Filter>
  );
};

export default AdministratorFilter;
