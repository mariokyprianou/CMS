/*
 * Jira Ticket: PDL-362
 * Created Date: Wed, 25th Nov 2020, 12:14:42 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  ReferenceInput,
  SelectInput,
  required,
  TextInput,
  ImageInput,
} from 'react-admin';
import { programmeEnvironmentChoices } from 'utils/choices';
import { columnStyles } from 'styles';
import PercentageInput from 'Components/Inputs/PercentageInput';

const DetailTab = () => {
  const classes = columnStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.column}>
          <ReferenceInput
            // TODO: How to populate a dynamic list of trainers without creating a Choices.
            source="trainer"
            reference="trainer"
          >
            <SelectInput
              source="name"
              choices="localisations"
              validate={required()}
            />
          </ReferenceInput>
          <SelectInput
            // TODO: a Trainer can only be assigned a maximum of one Gym programme and one Home programme
            source="type"
            choices={programmeEnvironmentChoices}
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <PercentageInput
            source="stats.fitness"
            label="resources.programme.fields.fitness"
          />
          <PercentageInput
            source="stats.muscle"
            label="resources.programme.fields.muscle"
          />
          <PercentageInput
            source="stats.fatLoss"
            label="resources.programme.fields.fatLoss"
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source=""
            label="resources.programme.fields.trainerImages"
            validate={required()}
            multiple
            options={{
              maxFiles: 5,
            }}
          />
        </div>
      </div>
      <TextInput
        // TODO: Check with Jess if there is a better way to do this
        source="localisations[0].description"
        label="resources.programme.fields.trainerDescriptionEnglish"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="localisations[1].description"
        label="resources.programme.fields.trainerDescriptionHindi"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="localisations[2].description"
        label="resources.programme.fields.trainerDescriptionUrdu"
        validate={required()}
        fullWidth
      />
    </Fragment>
  );
};

export default DetailTab;
