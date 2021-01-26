/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 15:13:10 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  Datagrid,
  EditButton,
  FunctionField,
  Pagination,
  ReferenceManyField,
} from 'react-admin';
import { LinkButton as CreateButton } from 'Components/Buttons';
import { Add } from '@material-ui/icons';
import { LocalisedTextField } from 'Components/Fields';
import { tabbedLists } from 'styles';

const ChallengesTab = (props) => {
  const classes = tabbedLists();
  return (
    <Fragment>
      <div className={classes.actions}>
        <CreateButton
          label={'ra.action.create'}
          pathname={'/challenge/create'}
          state={{
            record: {
              trainingProgrammeId:
                props && props.record ? props.record.id : null,
            },
          }}
          icon={<Add />}
        />
      </div>
      <ReferenceManyField
        reference="challenge"
        target="programmeId"
        pagination={<Pagination />}
        {...props}
      >
        <Datagrid>
          <LocalisedTextField source="name" language="en" sortable={false} />
          <FunctionField
            render={(record) => (
              <EditButton
                to={{
                  pathname: `/challenge/${record.id}`,
                  state: {
                    programmeId: props.record && props.record.id,
                  },
                }}
              />
            )}
          />
        </Datagrid>
      </ReferenceManyField>
    </Fragment>
  );
};

export default ChallengesTab;
