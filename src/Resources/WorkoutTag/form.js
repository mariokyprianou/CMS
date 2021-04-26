/*
 * Created Date: Fri, 23rd Apr 2021, 10:28:01 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import { TextInput, required } from 'react-admin';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';

const WorkoutTagForm = (props) => {
  return (
    <LocalisedComponentCloner
      component={<TextInput validate={required()} />}
      source="name"
      label="resources.workoutTag.fields.name"
    />
  );
};
export default WorkoutTagForm;
