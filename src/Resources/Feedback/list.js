/*
 * Jira Ticket: PDL-301
 * Created Date: Mon, 30th Nov 2020, 11:44:52 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import FeedbackAction from './actions';
import FeedbackFilter from './filters';

const FeedbackList = (props) => (
  <List
    {...props}
    title="resources.feedback.titles.feedbackManagement"
    actions={<FeedbackAction />}
    filters={<FeedbackFilter />}
  >
    <Datagrid>
      <TextField source="trainer" />
      <TextField source="programme" />
      <TextField source="workoutName" />
      <TextField source="emoji" />
      <TextField source="user" />
      <TextField source="timeTaken" />
      <TextField source="workoutIntensity" />
      <TextField source="date" />
    </Datagrid>
  </List>
);

export default FeedbackList;
