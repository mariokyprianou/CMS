/*
 * Jira Ticket: PDL-271
 * Created Date: Tue, 24th Nov 2020, 09:10:00 am
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

const AdministratorCreate = (props) => {
  const translate = useTranslate();

  return (
    <Create
      // TODO: Check that translate title is correct.
      title={translate('resources.administrator.titles.createAdministrator')}
      {...props}
    >
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <TextInput source="email" validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default AdministratorCreate;
