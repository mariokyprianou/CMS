/*
 * Jira Ticket: PDL-276
 * Created Date: Mon, 30th Nov 2020, 15:56:55 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput, SelectInput } from 'react-admin';

// TODO: Hook up to filter data.
const WorkoutFilter = (props) => (
  <Filter {...props}>
    <SelectInput source="trainer" />
    <SelectInput source="week" />
    <TextInput source="name" />
    <SelectInput source="programme" />
  </Filter>
);

export default WorkoutFilter;
