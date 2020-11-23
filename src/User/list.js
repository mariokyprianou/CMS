import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

const UserList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="role" />
    </Datagrid>
  </List>
);

export default UserList;
