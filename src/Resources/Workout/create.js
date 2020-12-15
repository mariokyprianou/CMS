/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 16:32:02 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import WorkoutForm from './form';

const WorkoutEdit = (props) => (
  <Create {...props}>
    <SimpleForm>
      <WorkoutForm />
    </SimpleForm>
  </Create>
);

export default WorkoutEdit;
