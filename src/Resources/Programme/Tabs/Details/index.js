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
  useTranslate,
  useNotify,
} from 'react-admin';
import {
  LocalisedReferenceInput,
  NoScrollNumberInput as NumberInput,
  PercentageInput,
} from 'Components/Inputs';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import {
  programmeEnvironmentChoices,
  publishStatusChoices,
} from 'utils/choices';
import { onDropRejected as onFileDropRejected } from 'utils';
import { maxImageSize } from 'utils/helpers';
import { nonNegativeNonZeroInt } from 'utils/validation';
import { columnStyles } from 'styles';

const maxFileCountValidation = (files = []) => {
  if (files && files.length > 5)
    return {
      message: 'error.field.image.maxFilesExceeded',
      args: { maxFiles: 5 },
    };
  return;
};

const fileValidation = [required(), maxFileCountValidation];
const weeksAvailableValidation = [required(), nonNegativeNonZeroInt];

const DetailTab = (props) => {
  const translate = useTranslate();
  const notify = useNotify();
  const { resource, record } = props;
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
          <NumberInput
            source="weeksAvailable"
            validate={weeksAvailableValidation}
            label="resources.programme.fields.weeksAvailable"
            helperText="resources.programme.fields.weeksAvailableHelperText"
          />
          <SelectInput
            source="status"
            choices={publishStatusChoices}
            validate={required()}
            defaultValue="DRAFT"
            disabled={record.id ? false : true} // do not allow edit of field on a create record
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
          <PercentageInput
            source="wellness"
            label="resources.programme.fields.wellness"
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source="images"
            label="resources.programme.fields.trainerImages"
            validate={fileValidation}
            multiple
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
