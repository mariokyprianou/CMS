/*
 * Jira Ticket: PDL-301
 * Created Date: Mon, 30th Nov 2020, 11:55:05 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { DateInput, Filter, TextInput, SelectInput } from 'react-admin';
import {
  LocalisedReferenceInput,
  NoScrollNumberInput as NumberInput,
} from 'Components/Inputs';
import { allFeedbackEmojis, feedbackIntensityChoices } from 'utils/choices';

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
      <SelectInput
        source="workoutIntensity"
        choices={feedbackIntensityChoices}
        format={(option) => {
          if (
            option &&
            option.hasOwnProperty('to') &&
            option.hasOwnProperty('from')
          ) {
            return `${option.from},${option.to}`;
          }
          return null;
        }}
        parse={(option) => {
          const minMax = option.split(',');
          return {
            from: parseInt(minMax[0]), // schema expects Int
            to: parseInt(minMax[1]),
          };
        }}
      />
      <DateInput source="dateFrom" />
      <DateInput source="dateTo" />
    </Filter>
  );
};

export default FeedbackFilter;
