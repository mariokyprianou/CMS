import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  SelectField,
  EditButton,
} from 'react-admin';
import { subscriptionPlatformChoices } from 'utils/choices';
import UserAction from './actions';
import UserFilter from './filters';

// TODO: Add in Actions for the exporting of CSV data (currently it removes the filters if put in).

const UserList = (props) => (
  <List
    filters={<UserFilter />}
    // actions={ <UserAction /> }
    {...props}
  >
    <Datagrid>
      <TextField source="givenName" />
      <TextField source="familyName" />
      <TextField source="email" />
      <TextField source="country" />
      <TextField source="region" />
      <BooleanField source="subscription.isSubscribed" />
      <SelectField
        source="subscription.platform"
        choices={subscriptionPlatformChoices}
      />
      <EditButton />
    </Datagrid>
  </List>
);

export default UserList;
