/*
 * Jira Ticket: PDL-274
 * Created Date: Tue, 24th Nov 2020, 13:04:42 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useTranslate,
} from 'react-admin';

const TrainerCreate = (props) => {
  const translate = useTranslate();
  return (
    <Create
      // TODO: Check that translate title is correct.
      title={translate('resources.trainer.titles.createTrainer')}
      {...props}
    >
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <TextInput source="email" validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default TrainerCreate;
