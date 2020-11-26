/*
 * Jira Ticket: PDL-300, PDL-362
 * Created Date: Wed, 25th Nov 2020, 12:24:11 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import { SelectInput, required, ImageInput } from 'react-admin';
import { columnStyles } from 'styles';
import { textColourChoices } from 'utils/choices';

// TODO: Check with Jess about the source's for Images and Select Inputs, and for the labels to append numbers.
const ShareMediaTab = () => {
  const classes = columnStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        {/* 1st Row - Programme Start */}
        <div className={classes.column}>
          <ImageInput
            source=""
            label="resources.programme.fields.programmeStartImage"
            multiple
            options={{
              maxFiles: 3,
            }}
          />
          <SelectInput
            source="textColour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
      </div>
      {/* 2nd Row - Week Complete */}
      <div className={classes.root}>
        <div className={classes.column}>
          <ImageInput
            source=""
            label="resources.programme.fields.weekCompleteImage"
          />
          <SelectInput
            source="textColour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source=""
            label="resources.programme.fields.weekCompleteImage"
          />
          <SelectInput
            source="textColour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source=""
            label="resources.programme.fields.weekCompleteImage"
          />
          <SelectInput
            source="textColour"
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
            source=""
            label="resources.programme.fields.challengeCompleteImage"
          />
          <SelectInput
            source="textColour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source=""
            label="resources.programme.fields.challengeCompleteImage"
          />
          <SelectInput
            source="textColour"
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
            source=""
            label="resources.programme.fields.progressImage"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ShareMediaTab;
