/*
 * Jira Ticket: PDL-362
 * Created Date: Wed, 25th Nov 2020, 12:14:42 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  required,
  ImageField,
  ImageInput,
  SelectInput,
  TextInput,
} from 'react-admin';
import { LocalisedReferenceInput, PercentageInput } from 'Components/Inputs';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { programmeEnvironmentChoices } from 'utils/choices';
import { columnStyles } from 'styles';

const DetailTab = (props) => {
  const { resource } = props;
  const classes = columnStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.column}>
          <LocalisedReferenceInput
            resource={resource}
            source="trainer.id"
            reference="trainer"
            validate={required()}
          >
            <SelectInput />
          </LocalisedReferenceInput>
          <SelectInput
            source="environment"
            choices={programmeEnvironmentChoices}
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <PercentageInput
            source="fitness"
            label="resources.programme.fields.fitness"
          />
          <PercentageInput
            source="muscle"
            label="resources.programme.fields.muscle"
          />
          <PercentageInput
            source="fatLoss"
            label="resources.programme.fields.fatLoss"
          />
        </div>
        <div className={classes.column}>
          {/* TODO: add validation to prevent more than 5 files exisitng at one time - the maxFiles prop doesn't appear to work */}
          <ImageInput
            source="images"
            label="resources.programme.fields.trainerImages"
            validate={required()}
            multiple
            options={{
              maxFiles: 5,
            }}
            accept="image/*"
          >
            <ImageField source="url" title="img" />
          </ImageInput>
        </div>
      </div>
      <LocalisedComponentCloner
        resource={resource}
        component={<TextInput multiline validate={required()} />}
        source="description"
        fullWidth
      />
    </Fragment>
  );
};

export default DetailTab;
