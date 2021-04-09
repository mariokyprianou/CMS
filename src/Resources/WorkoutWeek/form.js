/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 16:35:00 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment, useState, useRef } from 'react';
import {
  ArrayInput,
  FormDataConsumer,
  ImageInput,
  NumberInput,
  required,
  SelectInput,
  TextInput,
  useTranslate,
  useNotify,
} from 'react-admin';
import { useForm, useFormState } from 'react-final-form';
import {
  CustomSimpleFormIterator as SimpleFormIterator,
  RestrictedSimpleFormIterator,
} from 'Components/Forms';
import { InputAdornment } from '@material-ui/core';
import {
  nonNegativeNonZeroInt,
  nonNegativeNotRequiredInt,
} from 'utils/validation';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { LocalisedReferenceInput } from 'Components/Inputs';
import { PreviewImageField } from 'Components/Fields';
import get from 'lodash/get';
import { onDropRejected as onFileDropRejected } from 'utils';
import {
  programmeEnvironmentChoices,
  intensityChoices,
  exerciseTypeChoices,
} from 'utils/choices';
import { maxImageSize } from 'utils/helpers';
import { columnStyles } from 'styles';

const nonNegativeNonZeroValidation = [required(), nonNegativeNonZeroInt];
const nonNegativeIntValidation = [nonNegativeNotRequiredInt];

const SetsInput = ({ getSource, scopedFormData, translate }) => {
  return (
    <ArrayInput
      record={scopedFormData}
      source={getSource('sets')}
      validate={required()}
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
  const { record } = props;
  const classes = columnStyles();
  const translate = useTranslate();
  const notify = useNotify();
  const [selectedTrainerId, setSelectedTrainerId] = useState(
    (record && record.trainingProgrammeId) || null
  );
  const form = useForm();
  const { values } = useFormState();
  const [defaultCoachingTips, setDefaultCoachingTips] = useState({});
  const iteratorRef = useRef();
  const { resource } = props;

  const resetAllFields = () => {
    iteratorRef.current.resetAll();
  };

  return (
    <Fragment>
      <LocalisedComponentCloner
        resource={resource}
        fullWidth
        parentPath="workout"
        component={<TextInput fullWidth multiline validate={required()} />}
        source="name"
      />
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
            customFunc={(selection) => {
              if (selection && selection.trainer.id) {
                // set it to correct value
                setSelectedTrainerId(null);
                const currentValues = values;
                if (currentValues.workout && currentValues.workout.exercises) {
                  for (
                    let i = 0;
                    i < currentValues.workout.exercises.length;
                    i++
                  ) {
                    form.change(
                      `workout.exercises[${i}].exercise.id`,
                      undefined
                    );
                    form.change(
                      `workout.exercises[${i}].exercise.localisations`,
                      undefined
                    );
                  }
                }
                if (selectedTrainerId) {
                  resetAllFields();
                }
                setSelectedTrainerId(selection.trainer.id);
              }
            }}
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
        source="workout.overviewImage"
        accept="image/*"
        maxSize={maxImageSize}
        options={{
          onDropRejected: (files) =>
            onFileDropRejected({
              files,
              translate,
              notify,
              maxFileSize: maxImageSize,
            }),
        }}
      >
        <PreviewImageField />
      </ImageInput>
      {/* Exercises */}
      <FormDataConsumer>
        {({ formData }) =>
          selectedTrainerId && (
            <ArrayInput
              label="resources.workout.fields.exercisesRequired"
              source="workout.exercises"
              disabled={!selectedTrainerId}
            >
              <SimpleFormIterator ref={iteratorRef}>
                <LocalisedReferenceInput
                  resource="exercise"
                  label={`resources.${resource}.fields.exercise`}
                  source="exercise.id"
                  reference="exercise"
                  validate={required()}
                  filter={{ trainer: selectedTrainerId }}
                  customFunc={(selection, index) => {
                    if (selection && selection.localisations && index) {
                      const defaultLocalisations = selection.localisations;
                      // set the localisations in the form
                      // first set default values - this is for when we do not yet have the fields
                      const currentDefaultCoachingTips = {
                        ...defaultCoachingTips,
                      };
                      currentDefaultCoachingTips[
                        selection.id
                      ] = defaultLocalisations;
                      setDefaultCoachingTips({
                        ...currentDefaultCoachingTips,
                      });
                      // then change their values after
                      for (let i = 0; i < defaultLocalisations.length; i++) {
                        const defaultLocalisation = defaultLocalisations[i];
                        const coachingTipsFields = get(
                          formData,
                          `workout.exercises[${index[0]}].exercise.localisations`
                        );
                        if (coachingTipsFields) {
                          const fieldIndex = coachingTipsFields.findIndex(
                            (fieldLocalisation) =>
                              fieldLocalisation.language ==
                              defaultLocalisation.language
                          );
                          if (fieldIndex >= 0) {
                            const fieldPath = `workout.exercises[${index[0]}].exercise.localisations[${i}].coachingTips`;
                            form.change(
                              fieldPath,
                              defaultLocalisation.coachingTips
                            );
                          }
                        }
                      }
                    }
                  }}
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
                    getSource, // A function to get the valid source inside an ArrayInput
                    ...rest
                  }) =>
                    get(formData, `${getSource('exercise.id')}`) && (
                      <Fragment>
                        <LocalisedComponentCloner
                          label={`resources.${resource}.fields.additionalTrainerInfo`}
                          fullWidth
                          component={<TextInput fullWidth multiline />}
                          source="coachingTips"
                          parentPath={getSource('exercise')}
                          record={formData}
                          defaultValues={
                            defaultCoachingTips[
                              get(formData, `${getSource('exercise.id')}`)
                            ]
                          }
                          defaultValueFieldName="coachingTips"
                        />
                        <SetsInput
                          {...rest}
                          source={getSource('exercises')}
                          getSource={getSource}
                          extraClasses={classes}
                          translate={translate}
                        />
                      </Fragment>
                    )
                  }
                </FormDataConsumer>
              </SimpleFormIterator>
            </ArrayInput>
          )
        }
      </FormDataConsumer>
    </Fragment>
  );
};

export default WorkoutForm;
