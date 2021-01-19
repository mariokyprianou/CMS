/*
 * Jira Ticket: PDL-301
 * Created Date: Mon, 30th Nov 2020, 11:44:52 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  NumberField,
  TextField,
  useNotify,
} from 'react-admin';
import FeedbackAction from './actions';
import FeedbackFilter from './filters';
import useDataProviderWrapper from 'hooks/dataProviderWrapper';
import downloadFile from 'utils/downloadFile';
import { horizontalList } from 'styles';

const EmojisField = ({ record, source }) => {
  const classes = horizontalList();
  return (
    <ul className={classes.root}>
      {record[source].map((emoji, index) => (
        <span role="img" key={`emoji-${index}`} aria-label={emoji}>
          {emoji}
        </span>
      ))}
    </ul>
  );
};

const FeedbackList = (props) => {
  const notify = useNotify();
  const callToDataProvider = useDataProviderWrapper();
  const exportCSV = (filterValues) => {
    console.log('filterValues: ', filterValues);
    try {
      return callToDataProvider({
        type: 'EXPORT',
        resource: 'feedback',
        payload: {
          // filter: {filterValues}, //TODO: probably should handle filtering in the backend query
        },
        onSuccess: (result) => {
          if (result.data.data) {
            downloadFile({ uri: result.data.data, filename: 'feedback.csv' });
          }
        },
      });
    } catch (error) {
      return notify(
        error.message,
        'warning',
        error.payload,
        error.undoable,
        error.timeout
      );
    }
  };

  return (
    <List
      {...props}
      actions={<FeedbackAction onClick={exportCSV} />}
      filters={<FeedbackFilter />}
      bulkActionButtons={false}
    >
      <Datagrid>
        <TextField source="trainerName" />
        <NumberField source="week" />
        <TextField source="workoutName" />
        <EmojisField source="emojis" />
        <TextField source="userEmail" />
        <FunctionField
          source="timeTaken"
          render={(record) => record.timeTaken || '-' + ' mins'}
        />
        <TextField source="workoutIntensity" />
        <DateField source="date" />
      </Datagrid>
    </List>
  );
};

EmojisField.defaultProps = {
  addLabel: true,
};

export default FeedbackList;
