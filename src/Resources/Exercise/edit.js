/*
 * Jira Ticket: PDL-363
 * Created Date: Mon, 30th Nov 2020, 10:41:55 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
  ImageInput,
  FormDataConsumer,
} from 'react-admin';
import { columnStyles } from 'styles';
import { booleanTranslatedChoices } from 'utils/choices';

const ExerciseEdit = (props) => {
  const classes = columnStyles();
  return (
    <Edit {...props}>
      <SimpleForm>
        {/* 1st Row - Trainer / Weight / Category */}
        <div className={classes.root}>
          <div className={classes.column}>
            <ReferenceInput
              // TODO: How to populate a dynamic list of trainers without creating a Choices.
              source="trainer"
              reference="trainer"
            >
              <SelectInput
                source="localisations[0].name"
                validate={required()}
              />
            </ReferenceInput>
          </div>
          <div className={classes.column}>
            <SelectInput
              source="isWeight"
              choices={booleanTranslatedChoices}
              validate={required()}
            />
          </div>
          <div className={classes.column}>
            <FormDataConsumer>
              {({ formData }) =>
                formData.isWeight && (
                  <ReferenceInput
                    source="exerciseCategory"
                    reference="exerciseCategory"
                  >
                    <SelectInput source="name" />
                  </ReferenceInput>
                )
              }
            </FormDataConsumer>
          </div>
        </div>

        {/* 2nd Row - Name (Locale) */}
        <div className={classes.root}>
          <div className={classes.column}>
            <TextInput
              source="localisations[0].name"
              label="resources.exercise.fields.nameEnglish"
              validate={required()}
            />
          </div>
          <div className={classes.column}>
            <TextInput
              source="localisations[1].name"
              label="resources.exercise.fields.nameHindi"
              validate={required()}
            />
          </div>
          <div className={classes.column}>
            <TextInput
              source="localisations[2].name"
              label="resources.exercise.fields.nameUrdu"
              validate={required()}
            />
          </div>
        </div>

        {/* 3rd Row - Coaching Tips (Locale) */}
        <div className={classes.root}>
          <div className={classes.column}>
            <TextInput
              source="localisations[0].coachingTips"
              label="resources.exercise.fields.coachingTipsEnglish"
              validate={required()}
            />
          </div>
          <div className={classes.column}>
            <TextInput
              source="localisations[1].coachingTips"
              label="resources.exercise.fields.coachingTipsHindi"
              validate={required()}
            />
          </div>
          <div className={classes.column}>
            <TextInput
              source="localisations[2].coachingTips"
              label="resources.exercise.fields.coachingTipsUrdu"
              validate={required()}
            />
          </div>
        </div>

        {/* 4th Row - Videos (Main / Easy / Easier) */}
        <div className={classes.root}>
          <div className={classes.column}>
            {/* TODO: Currently using Image Input but should be using a Video Input. */}
            <ImageInput
              source="videos[0]"
              label="resources.exercise.fields.videoHard"
              validate={required()}
            />
          </div>
          <div className={classes.column}>
            {/* TODO: Currently using Image Input but should be using a Video Input. */}
            <ImageInput
              source="videos[1]"
              label="resources.exercise.fields.videoMedium"
            />
          </div>
          <div className={classes.column}>
            {/* TODO: Currently using Image Input but should be using a Video Input. */}
            <ImageInput
              source="videos[2]"
              label="resources.exercise.fields.videoEasy"
            />
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};

export default ExerciseEdit;
