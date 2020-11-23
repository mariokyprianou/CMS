import React from 'react';
import { Create, SimpleForm, TextField } from 'react-admin';

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextField source="name" />
      <TextField source="role" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
