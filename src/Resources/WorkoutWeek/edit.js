/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 16:32:02 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import WorkoutForm from './form';

const WorkoutEdit = (props) => (
  <Edit mutationMode="optimistic" {...props}>
    <SimpleForm>
      <WorkoutForm />
    </SimpleForm>
  </Edit>
);

export default WorkoutEdit;
