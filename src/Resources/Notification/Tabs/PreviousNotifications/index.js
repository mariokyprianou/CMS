/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 12:13:44 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { useState } from 'react';
import {
  Datagrid,
  DateField,
  FunctionField,
  Pagination,
  ReferenceManyField,
  SelectField,
  TextField,
  useNotify,
  useRefresh,
  useTranslate,
} from 'react-admin';
import useDataProviderWrapper from 'hooks/dataProviderWrapper';
import { ActionButton } from 'Components/Buttons';
import { Search } from '@material-ui/icons';
import { actionButtonStyles } from 'styles';

const PreviousNotificationsTab = (props) => {
  const translate = useTranslate();
  const callToDataProvider = useDataProviderWrapper();
  const notify = useNotify();
  const refreshView = useRefresh();

  // store all comment data associated with the selected comment
  const [selectedCommentDetails, setSelectedCommentDetails] = useState({});

  const buttonClasses = actionButtonStyles();

  const revokeNotification = async (action) => {
    try {
      const { id } = selectedCommentDetails;
      if (!(id && action)) throw new Error('error.generic');
      await callToDataProvider({
        type: 'REVOKE',
        resource: 'notification',
        payload: {
          data: { id },
        },
        onSuccess: () => refreshView(),
      });
      return;
    } catch (error) {
      return notify(error.message, 'warning');
    }
  };

  return (
    <ReferenceManyField
      {...props}
      addLabel={false}
      reference="notification"
      target="newsfeedArticleId"
      pagination={<Pagination rowsPerPageOptions={[]} />} // disable the options because it gets broken inside a tabbed form
      perPage={25}
    >
      <Datagrid>
        <TextField source="name" sortable={false} />
        <TextField source="comment" sortable={false} />
        <DateField source="createdAt" sortable={false} />
        <FunctionField
          render={(record) => (
            <ActionButton
              icon={<Search />}
              onClick={() => revokeNotification(record)}
              className={buttonClasses.floatRight}
            />
          )}
        />
      </Datagrid>
    </ReferenceManyField>
  );
};

export default PreviousNotificationsTab;
