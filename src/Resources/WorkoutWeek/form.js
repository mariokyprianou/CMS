/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 16:35:00 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  ArrayInput,
  FormDataConsumer,
  ImageField,
  ImageInput,
  NumberInput,
  required,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  useTranslate,
} from 'react-admin';
import RestrictedSimpleFormIterator from 'Components/RestrictedSimpleFormIterator';
import { InputAdornment } from '@material-ui/core';
import { nonNegativeNonZeroInt, nonNegativeInt } from 'utils/validation';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { LocalisedReferenceInput } from 'Components/Inputs';
import {
  programmeEnvironmentChoices,
  intensityChoices,
  exerciseTypeChoices,
} from 'utils/choices';
import { columnStyles } from 'styles';

const nonNegativeNonZeroValidation = [required(), nonNegativeNonZeroInt];
const nonNegativeIntValidation = [required(), nonNegativeInt];

const SetsInput = ({ scopedFormData, translate }) => {
  return (
    <ArrayInput validate={required()} source="sets">
      <RestrictedSimpleFormIterator maximumSize={5}>
        <NumberInput
          label="resources.workout.fields.work"
          source="quantity"
          validate={required()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {scopedFormData && scopedFormData.setType === 'REPS'
                  ? translate('util.reps')
                  : translate('util.seconds')}
              </InputAdornment>
            ),
          }}
        />
        <NumberInput
          label="resources.workout.fields.restTime"
          source="restTime"
          validate={nonNegativeIntValidation}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {translate('util.seconds')}
              </InputAdornment>
            ),
          }}
        />
      </RestrictedSimpleFormIterator>
    </ArrayInput>
  );
};

const WorkoutForm = (props) => {
  const classes = columnStyles();
  const translate = useTranslate();
  const { resource } = props;
  return (
    <Fragment>
      <LocalisedComponentCloner
        resource={resource}
        fullWidth
        component={<TextInput fullWidth multiline validate={required()} />}
        source="name"
      />
      <div className={classes.root}>
        <div className={classes.column}>
          <LocalisedReferenceInput
            resource={resource}
            source="programmeId"
            reference="programme"
            localisationsPath="trainer.localisations"
            additionalChoices={programmeEnvironmentChoices}
            additionalChoiceComparisonField="environment"
            validate={required()}
            resource={resource}
          >
            <SelectInput />
          </LocalisedReferenceInput>
          <NumberInput
            resource={resource}
            source="weekNumber"
            validate={nonNegativeNonZeroValidation}
          />
        </div>
        <div className={classes.column}>
          <NumberInput
            resource={resource}
            source="orderIndex"
            validate={nonNegativeNonZeroValidation}
          />
          <NumberInput
            resource={resource}
            source="duration"
            validate={nonNegativeNonZeroValidation}
          />
        </div>
        <div className={classes.column}>
          <SelectInput
            resource={resource}
            source="intensity"
            choices={intensityChoices}
            validate={required()}
          />
        </div>
      </div>
      <ImageInput resource={resource} source="overviewImage">
        <ImageField source="src" title="Overview Image" />
      </ImageInput>
      {/* Exercises */}
      <ArrayInput source="exercises" validate={required()}>
        <SimpleFormIterator>
          {/* TODO: filter the exercises to the trainer in scope - via programme */}
          <LocalisedReferenceInput
            resource="workout"
            label={`resources.${resource}.fields.exercise`}
            source="exercise"
            reference="exercise"
            validate={required()}
          >
            <SelectInput />
          </LocalisedReferenceInput>
          <SelectInput
            label={`resources.${resource}.fields.setType`}
            source="setType"
            choices={exerciseTypeChoices}
            validate={required()}
            defaultValue="REPS"
          />
          {/* TODO: needs logic to display the correct information - check if this is the exercise info field - should be uneditable */}
          <LocalisedComponentCloner
            label={`resources.${resource}.fields.additionalTrainerInfo`}
            fullWidth
            disabled
            component={<TextInput disabled fullWidth multiline />}
            source="name"
          />
          <FormDataConsumer>
            {({
              getSource, // A function to get the valid source inside an ArrayInput
              ...rest
            }) => (
              <SetsInput
                {...rest}
                source={getSource('exercises')}
                getSource={getSource}
                extraClasses={classes}
                translate={translate}
              />
            )}
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
    </Fragment>
  );
};

export default WorkoutForm;
