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
  SelectField,
  TextField,
  useNotify,
} from 'react-admin';
import emojiDictionary from 'emoji-dictionary';
import FeedbackAction from './actions';
import FeedbackFilter from './filters';
import useDataProviderWrapper from 'hooks/dataProviderWrapper';
import downloadFile from 'utils/downloadFile';
import { horizontalList } from 'styles';
import { programmeEnvironmentChoices } from 'utils/choices';

const EmojisField = ({ record, source }) => {
  const classes = horizontalList();
  return (
    <ul className={classes.root}>
      {record[source].map((emoji, index) => (
        <span role="img" key={`emoji-${index}`} aria-label={emoji}>
          {emojiDictionary.getUnicode(emoji.replace(/-/g, '_'))}
        </span>
      ))}
    </ul>
  );
};

const FeedbackList = (props) => {
  const notify = useNotify();
  const callToDataProvider = useDataProviderWrapper();
  const exportCSV = (filterValues) => {
    try {
      return callToDataProvider({
        type: 'EXPORT',
        resource: 'feedback',
        payload: {},
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
        <TextField source="trainerName" sortable={false} />
        <SelectField
          source="environment"
          choices={programmeEnvironmentChoices}
          sortable={false}
        />
        <NumberField source="week" sortable={false} />
        <TextField source="workoutName" sortable={false} />
        <EmojisField source="emojis" sortable={false} />
        <TextField source="userEmail" sortable={false} />
        <FunctionField
          source="timeTaken"
          render={(record) => record.timeTaken || '-' + ' mins'}
          sortable={false}
        />
        <TextField source="workoutIntensity" sortable={false} />
        <DateField source="date" sortable={false} />
      </Datagrid>
    </List>
  );
};

EmojisField.defaultProps = {
  addLabel: true,
};

export default FeedbackList;
