/*
 * Created Date: Fri, 23rd Apr 2021, 10:06:04 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import { Edit, SimpleForm, useTranslate } from 'react-admin';
import OnDemandWorkoutForm from './form';
import validateForm from './validateForm';

const OnDemandWorkoutEdit = (props) => {
  const translate = useTranslate();
  return (
    <Edit
      title={translate('resources.onDemandWorkout.titles.onDemandDetailTitle', {
        id: props.id,
      })}
      mutationMode="optimistic"
      {...props}
    >
      <SimpleForm validate={validateForm}>
        <OnDemandWorkoutForm />
      </SimpleForm>
    </Edit>
  );
};

export default OnDemandWorkoutEdit;
