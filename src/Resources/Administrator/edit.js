/*
 * Jira Ticket: PDL-272
 * Created Date: Tue, 24th Nov 2020, 12:26:25 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { useEffect, useState } from 'react';
import {
  Edit,
  DeleteButton,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from 'react-admin';
import { getCurrentLoggedInUser } from 'utils';
import { toolbarStyles } from 'styles';

const AdminToolbar = ({ currentUserId, ...props }) => {
  const classes = toolbarStyles();
  const { record } = props;

  return (
    <Toolbar className={classes.root} {...props}>
      <SaveButton />
      {record.id && currentUserId && record.id === currentUserId ? null : (
        <DeleteButton undoable={false} mutationMode="optimistic" />
      )}
    </Toolbar>
  );
};

const AdministratorEdit = (props) => {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      const { sub } = await getCurrentLoggedInUser();
      setCurrentUserId(sub);
    }
    if (!currentUserId) {
      getCurrentUser();
    }
  }, [currentUserId, setCurrentUserId]);

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<AdminToolbar currentUserId={currentUserId} />}>
        <TextInput source="name" />
        <TextInput source="email" fullWidth />
      </SimpleForm>
    </Edit>
  );
};

export default AdministratorEdit;
