/*
 * Created Date: Fri, 23rd Apr 2021, 10:06:04 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, { Fragment, useState, useRef } from 'react';
import {
  ArrayInput,
  BooleanInput,
  FormDataConsumer,
  ImageInput,
  required,
  SelectArrayInput,
  SelectInput,
  TextInput,
  useTranslate,
  useNotify,
} from 'react-admin';
import { useSelector } from 'react-redux';
import { useForm } from 'react-final-form';
import {
  CustomSimpleFormIterator as SimpleFormIterator,
  RestrictedSimpleFormIterator,
} from 'Components/Forms';
import { NoScrollNumberInput as NumberInput } from 'Components/Inputs';
import { InputAdornment } from '@material-ui/core';
import {
  nonNegativeNonZeroInt,
  nonNegativeNotRequiredInt,
} from 'utils/validation';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import {
  LocalisedReferenceInput,
  LocalisedReferenceArrayInput,
} from 'Components/Inputs';
import { PreviewImageField } from 'Components/Fields';
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
  // regular OnDemandWorkouts (non-continuous) can have up to 5 sets, continuous only have 1
  const maxSetSize = formData.isContinuous ? 1 : 5;
  const classes = nestedSimpleIterator();
  return (
    <ArrayInput
      record={scopedFormData}
      source={getSource('sets')}
      validate={required()}
      label="resources.onDemandWorkout.fields.sets"
    >
      <RestrictedSimpleFormIterator
        className={classes.root}
        maximumSize={maxSetSize}
      >
        <NumberInput
          label="resources.onDemandWorkout.fields.work"
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
          label="resources.onDemandWorkout.fields.restTime"
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

const OnDemandWorkoutForm = (props) => {
  const { record, resource } = props;
  const classes = columnStyles();
  const translate = useTranslate();
  const notify = useNotify();
  const [selectedTrainerId, setSelectedTrainerId] = useState(
    record?.programme?.trainer?.id || null
  );
  const form = useForm();
  const exerciseIteratorRef = useRef();

  const resetAllFields = () => {
    exerciseIteratorRef.current.resetAll();
  };

  const trainingProgrammes = useSelector(
    (state) => state.admin.resources.programme.data
  );
  const fetchTrainer = (id) => {
    return trainingProgrammes[id]?.trainer.id || null;
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
        component={<TextInput fullWidth multiline validate={required()} />}
        source="name"
      />
      <div className={classes.root}>
        <div className={classes.column}>
          <LocalisedReferenceInput
            resource={resource}
            source="programme.id"
            reference="programme"
            localisationsPath="trainer.localisations"
            additionalChoices={programmeEnvironmentChoices}
            additionalChoiceComparisonField="environment"
            validate={required()}
            onChange={(event) => {
              if (event.target.value) {
                const selectedProgrammeId = event.target.value;
                const theTrainerId = fetchTrainer(selectedProgrammeId) || null;
                if (theTrainerId && selectedTrainerId) resetAllFields();
                // update the state to reflect current selected trainer id
                setSelectedTrainerId(theTrainerId);
              }
            }}
          >
            <SelectInput />
          </LocalisedReferenceInput>
          <BooleanInput
            resource={resource}
            source="isContinuous"
            defaultValue={false}
          />
        </div>
        <div className={classes.column}>
          <NumberInput
            resource={resource}
            source="duration"
            validate={nonNegativeNonZeroValidation}
          />
          <SelectInput
            resource={resource}
            source="intensity"
            choices={intensityChoices}
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <LocalisedReferenceArrayInput
            language="en"
            source="tagIds"
            reference="workoutTag"
            resource={resource}
          >
            <SelectArrayInput />
          </LocalisedReferenceArrayInput>
        </div>
      </div>
      <ImageInput
        resource={resource}
        source="overviewImage"
        accept="image/*"
        validate={required()}
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
      <ArrayInput
        label="resources.onDemandWorkout.fields.exercises"
        source="exercises"
        validate={required()}
      >
        <SimpleFormIterator ref={exerciseIteratorRef}>
          <LocalisedReferenceInput
            resource="exercise"
            label={`resources.${resource}.fields.exercise`}
            source="exercise.id"
            reference="exercise"
            validate={required()}
            sort={{ field: 'name', order: 'ASC' }}
            perPage={1000}
            filter={{ trainer: selectedTrainerId }}
            // auto-fill values for coaching tips based on the selected exercise
            onChange={(event) => {
              if (event.target) {
                const exerciseId = event.target.value;
                // event.target.name is like "workout.exercises[index].exercise.id"
                const exerciseArrayIndex = event.target.name.match(/\d+/)[0]; // get just the first index
                if (exerciseId && exerciseArrayIndex) {
                  const defaultLocalisations = fetchExercise(exerciseId)
                    .localisations;
                  // then change their values after
                  for (let i = 0; i < defaultLocalisations.length; i++) {
                    const defaultLocalisation = defaultLocalisations[i];
                    const fieldPath = `exercises[${exerciseArrayIndex}].localisations[${i}].coachingTips`;
                    form.change(fieldPath, defaultLocalisation.coachingTips);
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
            }) => (
              <Fragment>
                <TextInput
                  source={`${getSource('localisations[0].coachingTips')}`}
                  fullWidth
                  multiline
                  label={translate(
                    `resources.${resource}.fields.additionalTrainerInfo`,
                    { lang: '(English)' }
                  )}
                />
                <TextInput
                  source={`${getSource('localisations[1].coachingTips')}`}
                  fullWidth
                  multiline
                  label={translate(
                    `resources.${resource}.fields.additionalTrainerInfo`,
                    { lang: '(Hindi)' }
                  )}
                />
                <TextInput
                  source={`${getSource('localisations[2].coachingTips')}`}
                  fullWidth
                  multiline
                  label={translate(
                    `resources.${resource}.fields.additionalTrainerInfo`,
                    { lang: '(Urdu)' }
                  )}
                />
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
    </Fragment>
  );
};

export default OnDemandWorkoutForm;
