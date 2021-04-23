/*
 * Created Date: Fri, 23rd Apr 2021, 10:06:04 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import OnDemandWorkoutForm from './form';
import validateForm from './validateForm';

const OnDemandWorkoutEdit = (props) => (
  <Create
    title="resources.onDemandWorkout.titles.onDemandCreateTitle"
    {...props}
  >
    <SimpleForm validate={validateForm}>
      <OnDemandWorkoutForm />
    </SimpleForm>
  </Create>
);

export default OnDemandWorkoutEdit;
