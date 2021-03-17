/*
 * Jira Ticket: PDL-363
 * Created Date: Mon, 30th Nov 2020, 10:41:55 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import ExerciseForm from './form';

const ExerciseEdit = (props) => {
  return (
    <Edit mutationMode="optimistic" {...props}>
      <SimpleForm>
        <ExerciseForm />
      </SimpleForm>
    </Edit>
  );
};

export default ExerciseEdit;
