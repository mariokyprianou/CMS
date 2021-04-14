/*
 * Jira Ticket: PDL-269
 * Created Date: Mon, 23rd Nov 2020, 14:24:39 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  SelectField,
  EditButton,
  FunctionField,
  ReferenceField,
  useTranslate,
} from 'react-admin';
import { subscriptionPlatformChoices } from 'utils/choices';
import UserAction from './actions';
import UserFilter from './filters';

const UserList = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title="resources.user.titles.userManagement"
      actions={<UserAction />}
      filters={<UserFilter />}
      bulkActionButtons={false}
    >
      <Datagrid>
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="email" />
        <ReferenceField source="country.id" reference="country" link={false}>
          <TextField source="country" />
        </ReferenceField>
        <ReferenceField source="region.id" reference="region" link={false}>
          <TextField source="region" />
        </ReferenceField>
        <BooleanField source="emailMarketing" />
        <FunctionField
          label="resources.user.fields.subscription.platform"
          render={(record) =>
            record.subscription.platform ? (
              <SelectField
                record={record}
                source="subscription.platform"
                choices={subscriptionPlatformChoices}
              />
            ) : (
              translate('choices.subscriptionPlatform.no')
            )
          }
        />

        <EditButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
