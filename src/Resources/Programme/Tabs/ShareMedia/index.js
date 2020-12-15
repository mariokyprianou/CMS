/*
 * Jira Ticket: PDL-300, PDL-362
 * Created Date: Wed, 25th Nov 2020, 12:24:11 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import { ImageField, ImageInput, SelectInput, required } from 'react-admin';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { columnStyles } from 'styles';
import { textColourChoices } from 'utils/choices';

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
        resource="programme"
        direction="row"
        fullWidth
        source="programmeStartImage"
        label="programmeStartImage"
      />
      {/* 2nd Row - Week Complete */}
      <div className={classes.root}>
        <div className={classes.column}>
          <ImageInput
            source="weekCompleteImage1"
            label="resources.programme.fields.weekCompleteImage1"
          >
            <ImageField source="src" title="weekCompleteImage1" />
          </ImageInput>
          <SelectInput
            source="weekCompleteImage1Colour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source="weekCompleteImage2"
            label="resources.programme.fields.weekCompleteImage2"
          >
            <ImageField source="src" title="weekCompleteImage2" />
          </ImageInput>
          <SelectInput
            source="weekCompleteImage2Colour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source="weekCompleteImage3"
            label="resources.programme.fields.weekCompleteImage3"
          >
            <ImageField source="src" title="weekCompleteImage3" />
          </ImageInput>
          <SelectInput
            source="weekCompleteImage3Colour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
      </div>
      {/* 3rd Row - Challenge Complete */}
      <div className={classes.root}>
        <div className={classes.column}>
          <ImageInput
            source="challengeImage1"
            label="resources.programme.fields.challengeCompleteImage1"
          >
            <ImageField source="src" title="challengeImage1" />
          </ImageInput>
          <SelectInput
            source="challengeImage1Colour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source="challengeImage2"
            label="resources.programme.fields.challengeCompleteImage2"
          >
            <ImageField source="src" title="challengeImage2" />
          </ImageInput>
          <SelectInput
            source="challengeImage2Colour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
      </div>
      {/* 4th Row - Progress */}
      <div className={classes.root}>
        <div className={classes.column}>
          <ImageInput
            source="progressImage"
            label="resources.programme.fields.progressImage"
          >
            <ImageField source="src" title="progressImage" />
          </ImageInput>
          <SelectInput
            source="progressImageColour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ShareMediaTab;
