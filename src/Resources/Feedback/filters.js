/*
 * Jira Ticket: PDL-301
 * Created Date: Mon, 30th Nov 2020, 11:55:05 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  DateInput,
  Filter,
  TextInput,
  NumberInput,
  SelectInput,
} from 'react-admin';
import { LocalisedReferenceInput } from 'Components/Inputs';
import { allFeedbackEmojis } from 'utils/choices';

const FeedbackFilter = (props) => {
  const { resource } = props;
  return (
    <Filter {...props}>
      <LocalisedReferenceInput
        resource={resource}
        reference="trainer"
        source="trainerId"
        perPage={1000}
        sort={{ field: 'name', order: 'ASC' }}
        allowEmpty={true}
      >
        <SelectInput />
      </LocalisedReferenceInput>
      <NumberInput source="weekNumber" />
      <TextInput source="workoutName" />
      <SelectInput source="emoji" choices={allFeedbackEmojis} />
      <TextInput source="userEmail" />
      <NumberInput source="timeTaken" />
      <NumberInput source="feedbackIntensity" />
      <DateInput
        parse={(d) => {
          const dateTime = new Date(d); // start of day 00:00:00
          return dateTime;
        }}
        source="dateFrom"
      />
      <DateInput
        parse={(d) => {
          const dateTime = new Date(d);
          dateTime.setHours(23, 59, 59, 999); // end of day 23:59:59
          return dateTime;
        }}
        source="dateTo"
      />
    </Filter>
  );
};

export default FeedbackFilter;
