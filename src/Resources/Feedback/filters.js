/*
 * Jira Ticket: PDL-301
 * Created Date: Mon, 30th Nov 2020, 11:55:05 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput } from 'react-admin';

// TODO: Add filter functionality.

const FeedbackFilter = (props) => (
  <Filter {...props}>
    <TextInput source="trainer" />
    <TextInput source="programme" />
    <TextInput source="workoutName" />
    <TextInput source="emoji" />
    <TextInput source="user" />
    <TextInput source="timeTaken" />
    <TextInput source="workoutIntensity" />
    <TextInput source="date" />
  </Filter>
);

export default FeedbackFilter;
