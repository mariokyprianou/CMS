/*
 * Jira Ticket: PDL-300, PDL-362
 * Created Date: Wed, 25th Nov 2020, 12:24:11 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  ImageField,
  ImageInput,
  FormDataConsumer,
  SelectInput,
  required,
} from 'react-admin';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { columnStyles } from 'styles';
import { textColourChoices } from 'utils/choices';
import { maxImageSize } from 'utils/helpers';

// TODO: CMS Logic need to format the data to localised fields to match backend
// and pull out data from localised fields to match the form requirements here
const ShareMediaTab = () => {
  const classes = columnStyles();
  return (
    <Fragment>
      {/* 1st Row - Programme Start */}
      <LocalisedComponentCloner
        component={
          <ImageInput>
            <ImageField source="src" title="programmeStartImage" />
          </ImageInput>
        }
        accept="image/*"
        validate={required()}
        resource="programme"
        direction="row"
        fullWidth
        maxSize={maxImageSize}
        source="programmeStartImage"
      />
      {/* 2nd Row - Week Complete */}
      <div className={classes.root}>
        <div className={classes.column}>
          <ImageInput
            source="weekCompleteImage1"
            accept="image/*"
            validate={required()}
            maxSize={maxImageSize}
            label="resources.programme.fields.weekCompleteImage1"
          >
            <ImageField source="src" title="weekCompleteImage1" />
          </ImageInput>
          <SelectInput
            source="weekCompleteImage1Colour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            defaultValue="WHITE"
            initialValue="WHITE"
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source="weekCompleteImage2"
            accept="image/*"
            maxSize={maxImageSize}
            label="resources.programme.fields.weekCompleteImage2"
          >
            <ImageField source="src" title="weekCompleteImage2" />
          </ImageInput>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.weekCompleteImage2 && (
                <SelectInput
                  source="weekCompleteImage2Colour"
                  label="resources.programme.fields.textColour"
                  choices={textColourChoices}
                  defaultValue="WHITE"
                  initialValue="WHITE"
                  validate={required()}
                />
              )
            }
          </FormDataConsumer>
        </div>
        <div className={classes.column}>
          <ImageInput
            source="weekCompleteImage3"
            accept="image/*"
            maxSize={maxImageSize}
            label="resources.programme.fields.weekCompleteImage3"
          >
            <ImageField source="src" title="weekCompleteImage3" />
          </ImageInput>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.weekCompleteImage3 && (
                <SelectInput
                  source="weekCompleteImage3Colour"
                  label="resources.programme.fields.textColour"
                  choices={textColourChoices}
                  defaultValue="WHITE"
                  initialValue="WHITE"
                  validate={required()}
                />
              )
            }
          </FormDataConsumer>
        </div>
      </div>
      {/* 3rd Row - Challenge Complete */}
      <div className={classes.root}>
        <div className={classes.column}>
          <ImageInput
            source="challengeImage1"
            accept="image/*"
            maxSize={maxImageSize}
            validate={required()}
            label="resources.programme.fields.challengeCompleteImage1"
          >
            <ImageField source="src" title="challengeImage1" />
          </ImageInput>
          <SelectInput
            source="challengeImage1Colour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            defaultValue="WHITE"
            initialValue="WHITE"
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source="challengeImage2"
            accept="image/*"
            maxSize={maxImageSize}
            label="resources.programme.fields.challengeCompleteImage2"
          >
            <ImageField source="src" title="challengeImage2" />
          </ImageInput>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.challengeImage2 && (
                <SelectInput
                  source="challengeImage2Colour"
                  label="resources.programme.fields.textColour"
                  choices={textColourChoices}
                  defaultValue="WHITE"
                  initialValue="WHITE"
                  validate={required()}
                />
              )
            }
          </FormDataConsumer>
        </div>
      </div>
      {/* 4th Row - Progress */}
      <div className={classes.root}>
        <div className={classes.column}>
          <ImageInput
            source="progressImage"
            accept="image/*"
            maxSize={maxImageSize}
            label="resources.programme.fields.progressImage"
          >
            <ImageField source="src" title="progressImage" />
          </ImageInput>
          <SelectInput
            source="progressImageColour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            defaultValue="WHITE"
            initialValue="WHITE"
            validate={required()}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ShareMediaTab;
