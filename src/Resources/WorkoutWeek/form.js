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
import { maxImageSize } from 'utils/helpers';
import { columnStyles } from 'styles';

const nonNegativeNonZeroValidation = [required(), nonNegativeNonZeroInt];
const nonNegativeIntValidation = [required(), nonNegativeInt];

const SetsInput = ({ getSource, scopedFormData, translate }) => {
  return (
    <ArrayInput
      record={scopedFormData}
      validate={required()}
      source={getSource('sets')}
      label="resources.workout.fields.sets"
    >
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
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <LocalisedComponentCloner
            resource={resource}
            fullWidth
            record={formData.workout}
            component={<TextInput fullWidth multiline validate={required()} />}
            source="name"
          />
        )}
      </FormDataConsumer>
      <div className={classes.root}>
        <div className={classes.column}>
          <LocalisedReferenceInput
            resource={resource}
            source="trainingProgrammeId"
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
            source="workout.duration"
            validate={nonNegativeNonZeroValidation}
          />
        </div>
        <div className={classes.column}>
          <SelectInput
            resource={resource}
            source="workout.intensity"
            choices={intensityChoices}
            validate={required()}
          />
        </div>
      </div>
      <ImageInput
        resource={resource}
        source="overviewImage"
        accept="image/*"
        maxSize={maxImageSize}
      >
        <ImageField source="src" title="Overview Image" />
      </ImageInput>
      {/* Exercises */}
      <FormDataConsumer>
        {({ formData }) => (
          <ArrayInput
            label="resources.workout.fields.exercisesRequired"
            source="workout.exercises"
          >
            <SimpleFormIterator>
              {/* TODO: filter the exercises to the trainer in scope - via programme */}
              {/* TODO: find out if formData.trainerId is correct when added */}
              <LocalisedReferenceInput
                resource="exercise"
                label={`resources.${resource}.fields.exerciseRequired`}
                source="exercise.id"
                reference="exercise"
                validate={required()}
                filter={{ trainer: formData.trainerId }}
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
              <FormDataConsumer>
                {({
                  formData,
                  getSource, // A function to get the valid source inside an ArrayInput
                  ...rest
                }) => (
                  <Fragment>
                    <LocalisedComponentCloner
                      label={`resources.${resource}.fields.additionalTrainerInfo`}
                      fullWidth
                      component={<TextInput fullWidth multiline />}
                      source="coachingTips"
                      parentPath={getSource('exercise')}
                      record={formData}
                    />
                    {/* TODO: fix the sets - not showing up */}
                    <SetsInput
                      {...rest}
                      source={getSource('exercises')}
                      getSource={getSource}
                      extraClasses={classes}
                      translate={translate}
                    />
                  </Fragment>
                )}
              </FormDataConsumer>
            </SimpleFormIterator>
          </ArrayInput>
        )}
      </FormDataConsumer>
    </Fragment>
  );
};

export default WorkoutForm;
