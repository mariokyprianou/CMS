/*
 * Jira Ticket: PDL-128
 * Created Date: Thu, 26th Nov 2020, 12:32:33 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput } from 'react-admin';

const ExerciseCategoryFilter = (props) => (
  <Filter {...props}>
    <TextInput source="name" />
  </Filter>
);

export default ExerciseCategoryFilter;
