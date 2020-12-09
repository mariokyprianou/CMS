/*
 * Jira Ticket: PDL-130
 * Created Date: Mon, 30th Nov 2020, 10:19:07 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput } from 'react-admin';

const ExerciseFilter = (props) => (
  <Filter {...props}>
    <TextInput source="q" label="resources.exercise.fields.trainer" />
    <TextInput source="q" label="resources.exercise.fields.name" />
  </Filter>
);

export default ExerciseFilter;
