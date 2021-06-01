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
  NumberInput,
  required,
  SelectArrayInput,
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
import {
  LocalisedReferenceInput,
  LocalisedReferenceArrayInput,
} from 'Components/Inputs';
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
    (record.programme && record.programme.id) || null
  );
  const form = useForm();
  const { values } = useFormState();
  const [defaultCoachingTips, setDefaultCoachingTips] = useState({});
  const exerciseIteratorRef = useRef();

  const resetAllFields = () => {
    exerciseIteratorRef.current.resetAll();
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
                const selectedTrainerId = event.target.value;
                // set it to correct value
                setSelectedTrainerId(null);
                const currentValues = values;
                if (currentValues && currentValues.exercises) {
                  for (let i = 0; i < currentValues.exercises.length; i++) {
                    form.change(
                      `onDemandWorkout.exercises[${i}].exercise.id`,
                      undefined
                    );
                    form.change(
                      `onDemandWorkout.exercises[${i}].exercise.localisations`,
                      undefined
                    );
                  }
                }
                // reset the exercise array
                resetAllFields();
                // update the state to reflect current selected trainer id
                setSelectedTrainerId(selectedTrainerId);
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
      <FormDataConsumer>
        {({ formData }) =>
          selectedTrainerId && (
            <ArrayInput
              label="resources.onDemandWorkout.fields.exercises"
              source="exercises"
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
                  filter={{ trainer: selectedTrainerId }}
                  // custom function to set the default coaching tips on selecting an exercise
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
                          `exercises[${index[0]}].exercise.localisations`
                        );
                        if (coachingTipsFields) {
                          const fieldIndex = coachingTipsFields.findIndex(
                            (fieldLocalisation) =>
                              fieldLocalisation.language ==
                              defaultLocalisation.language
                          );
                          if (fieldIndex >= 0) {
                            const fieldPath = `exercises[${index[0]}].exercise.localisations[${i}].coachingTips`;
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

export default OnDemandWorkoutForm;
