import React from 'react';
import { Edit, SimpleForm, TextField } from 'react-admin';

const UserList = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="role" />
    </SimpleForm>
  </Edit>
);

export default UserList;
