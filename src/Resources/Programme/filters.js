/*
 * Jira Ticket: PDL-275
 * Created Date: Tue, 24th Nov 2020, 15:19:06 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput } from 'react-admin';

// TODO: Add filter functionality.

const ProgrammeFilter = (props) => (
  <Filter {...props}>
    <TextInput source="trainer" />
    <TextInput source="environment" />
  </Filter>
);

export default ProgrammeFilter;
