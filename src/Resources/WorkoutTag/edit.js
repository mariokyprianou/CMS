/*
 * Created Date: Fri, 23rd Apr 2021, 10:23:02 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import WorkoutTagForm from './form';

const WorkoutTagEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <WorkoutTagForm />
    </SimpleForm>
  </Edit>
);

export default WorkoutTagEdit;
