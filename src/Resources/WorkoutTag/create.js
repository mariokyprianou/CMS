/*
 * Created Date: Fri, 23rd Apr 2021, 10:23:02 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import WorkoutTagForm from './form';

const WorkoutTagCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <WorkoutTagForm />
    </SimpleForm>
  </Create>
);

export default WorkoutTagCreate;
