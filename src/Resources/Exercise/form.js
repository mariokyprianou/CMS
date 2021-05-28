/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 09:54:06 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  FileInput,
  FormDataConsumer,
  ReferenceInput,
  required,
  SelectInput,
  TextInput,
} from 'react-admin';
import { PreviewFileField } from 'Components/Fields';
import { LocalisedReferenceInput } from 'Components/Inputs';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { booleanTranslatedChoices } from 'utils/choices';
import { rowStyles } from 'styles';

const ExerciseForm = (props) => {
  const classes = rowStyles();
  const { resource } = props;

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.rowItems}>
          <LocalisedReferenceInput
            resource={resource}
            reference="trainer"
            source="trainer"
            perPage={1000}
            fullWidth
            validate={required()}
            sort={{ field: 'name', order: 'ASC' }}
          >
            <SelectInput />
          </LocalisedReferenceInput>
        </div>
        <div className={classes.rowItems}>
          <SelectInput
            resource={resource}
            source="weight"
            fullWidth
            defaultValue={false}
            choices={booleanTranslatedChoices}
            validate={required()}
          />
        </div>
        <div className={classes.rowItems}>
          <FormDataConsumer>
            {({ formData }) =>
              formData.weight && (
                <ReferenceInput
                  resource={resource}
                  source="category.id"
                  reference="exerciseCategory"
                  allowEmpty={true}
                  fullWidth
                >
                  <SelectInput source="name" />
                </ReferenceInput>
              )
            }
          </FormDataConsumer>
        </div>
      </div>
      <LocalisedComponentCloner
        component={<TextInput validate={required()} />}
        source="name"
        fullWidth
        resource={resource}
      />
      <LocalisedComponentCloner
        component={<TextInput multiline />}
        source="coachingTips"
        fullWidth
        resource={resource}
      />
      <FileInput
        accept="video/mp4"
        resource={resource}
        source="video"
        validate={required()}
      >
        <PreviewFileField title={`resources.${resource}.fields.video`} />
      </FileInput>
      <FileInput accept="video/mp4" resource={resource} source="videoEasy">
        <PreviewFileField title={`resources.${resource}.fields.videoEasy`} />
      </FileInput>
      <FileInput accept="video/mp4" resource={resource} source="videoEasiest">
        <PreviewFileField title={`resources.${resource}.fields.videoEasiest`} />
      </FileInput>
    </Fragment>
  );
};
export default ExerciseForm;
