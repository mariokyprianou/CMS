/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 16:35:00 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment, useState, useRef } from 'react';
import {
  AutocompleteInput,
  ArrayInput,
  BooleanInput,
  FormDataConsumer,
  ImageInput,
  NumberInput,
  required,
  SelectInput,
  TextInput,
  useTranslate,
  useNotify,
} from 'react-admin';
import { useSelector } from 'react-redux';
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
import { columnStyles, nestedSimpleIterator } from 'styles';

const nonNegativeNonZeroValidation = [required(), nonNegativeNonZeroInt];
const nonNegativeIntValidation = [nonNegativeNotRequiredInt];

const SetsInput = ({ getSource, formData, scopedFormData, translate }) => {
  // regular workouts (non-continuous) can have up to 5 sets, continuous only have 1
  const maxSetSize = formData.workout.isContinuous ? 1 : 5;
  const classes = nestedSimpleIterator();
  return (
    <ArrayInput
      record={scopedFormData}
      source={getSource('sets')}
      validate={required()}
      label="resources.workout.fields.sets"
    >
      <RestrictedSimpleFormIterator
        className={classes.root}
        maximumSize={maxSetSize}
      >
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
  const { record, resource } = props;
  const classes = columnStyles();
  const translate = useTranslate();
  const notify = useNotify();
  const [selectedTrainerId, setSelectedTrainerId] = useState(
    record?.programme?.trainer?.id || null
  );
  const form = useForm();
  const { values } = useFormState();
  const [defaultCoachingTips, setDefaultCoachingTips] = useState({});
  const exerciseIteratorRef = useRef();

  const resetAllFields = () => {
    exerciseIteratorRef.current.resetAll();
  };

  const trainingProgrammes = useSelector(
    (state) => state.admin.resources.programme.data
  );
  const fetchTrainer = (id) => {
    return trainingProgrammes[id]?.trainer.id;
  };
  const exercises = useSelector((state) => state.admin.resources.exercise.data);
  const fetchExercise = (id) => {
    return exercises[id];
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
            onChange={(evt) => {
              if (evt.target.value) {
                const selectedProgrammeId = evt.target.value;
                const theTrainerId = fetchTrainer(selectedProgrammeId);
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
                if (theTrainerId && selectedTrainerId) resetAllFields();
                // update the state to reflect current selected trainer id
                setSelectedTrainerId(theTrainerId);
              }
            }}
          >
            <SelectInput onChange={() => console.log('i got changed')} />
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
          <BooleanInput
            resource={resource}
            source="workout.isContinuous"
            defaultValue={false}
          />
        </div>
        <div className={classes.column}>
          <NumberInput
            resource={resource}
            source="workout.duration"
            validate={nonNegativeNonZeroValidation}
          />
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
              label="resources.workout.fields.exercises"
              source="workout.exercises"
              disabled={!selectedTrainerId}
              validate={required()}
            >
              <SimpleFormIterator ref={exerciseIteratorRef}>
                <LocalisedReferenceInput
                  resource="exercise"
                  label={`resources.${resource}.fields.exercise`}
                  source="exercise.id"
                  reference="exercise"
                  validate={required()}
                  perPage={1000}
                  filter={{ trainer: selectedTrainerId }}
                  filterToQuery={(searchText) => ({ name: searchText || null })}
                  // custom function to set the default coaching tips on selecting an exercise
                  onChange={(event) => {
                    if (event.target) {
                      const exerciseId = event.target.value;
                      // event.target.name is like "workout.exercises[index].exercise.id"
                      const exerciseArrayIndex = event.target.name.match(
                        /\d+/
                      )[0]; // get just the first index
                      if (exerciseId && exerciseArrayIndex) {
                        const defaultLocalisations = fetchExercise(exerciseId)
                          .localisations;
                        // set the localisations in the form
                        // first set default values - this is for when we do not yet have the fields
                        // make sure to set each default localisation in state to match the exercises array
                        const currentDefaultCoachingTips = {
                          ...defaultCoachingTips,
                        };
                        currentDefaultCoachingTips[
                          exerciseId
                        ] = defaultLocalisations;
                        setDefaultCoachingTips({
                          ...currentDefaultCoachingTips,
                        });
                        // then change their values after
                        for (let i = 0; i < defaultLocalisations.length; i++) {
                          const defaultLocalisation = defaultLocalisations[i];
                          const coachingTipsFields = get(
                            formData,
                            `exercises[${exerciseArrayIndex}].exercise.localisations`
                          );
                          if (coachingTipsFields) {
                            const fieldIndex = coachingTipsFields.findIndex(
                              (fieldLocalisation) =>
                                fieldLocalisation.language ==
                                defaultLocalisation.language
                            );
                            if (fieldIndex >= 0) {
                              const fieldPath = `exercises[${exerciseArrayIndex}].exercise.localisations[${i}].coachingTips`;
                              form.change(
                                fieldPath,
                                defaultLocalisation.coachingTips
                              );
                            }
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
