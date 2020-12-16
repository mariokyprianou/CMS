/*
 * Jira Ticket: PDL-363
 * Created Date: Mon, 30th Nov 2020, 10:42:07 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import ExerciseForm from './form';

const ExerciseCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ExerciseForm />
      </SimpleForm>
    </Create>
  );
};

export default ExerciseCreate;
