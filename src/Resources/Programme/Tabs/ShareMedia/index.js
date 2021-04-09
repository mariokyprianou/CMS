/*
 * Jira Ticket: PDL-300, PDL-362
 * Created Date: Wed, 25th Nov 2020, 12:24:11 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  ImageInput,
  FormDataConsumer,
  SelectInput,
  required,
  useTranslate,
  useNotify,
} from 'react-admin';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { columnStyles } from 'styles';
import { textColourChoices } from 'utils/choices';
import { maxImageSize } from 'utils/helpers';
import { PreviewImageField } from 'Components/Fields';
import { onDropRejected as onFileDropRejected } from 'utils';

const ShareMediaTab = (props) => {
  const translate = useTranslate();
  const classes = columnStyles();
  const notify = useNotify();
  const { record } = props;

  return (
    <Fragment>
      {/* 1st Row - Programme Start */}
      <LocalisedComponentCloner
        component={
          <ImageInput>
            <PreviewImageField />
          </ImageInput>
        }
        source="image"
        record={record}
        label="resources.programme.fields.programmeStartImage"
        accept="image/*"
        validate={required()}
        resource="programme"
        direction="row"
        fullWidth
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
        parentPath="programmeStartImages"
      />
      {/* 2nd Row - Week Complete */}
      <div className={classes.root}>
        <div className={classes.column}>
          <ImageInput
            source="weekComplete0.image"
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
            label="resources.programme.fields.weekCompleteImage1"
          >
            <PreviewImageField />
          </ImageInput>
          <SelectInput
            source="weekComplete0.colour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            defaultValue="WHITE"
            initialValue="WHITE"
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source="weekComplete1.image"
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
            label="resources.programme.fields.weekCompleteImage2"
          >
            <PreviewImageField />
          </ImageInput>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.weekComplete1 && (
                <SelectInput
                  source="weekComplete1.colour"
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
            source="weekComplete2.image"
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
            label="resources.programme.fields.weekCompleteImage3"
          >
            <PreviewImageField />
          </ImageInput>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.weekComplete2 && (
                <SelectInput
                  source="weekComplete2.colour"
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
            source="challengeComplete0.image"
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
            validate={required()}
            label="resources.programme.fields.challengeCompleteImage1"
          >
            <PreviewImageField />
          </ImageInput>
          <SelectInput
            source="challengeComplete0.colour"
            label="resources.programme.fields.textColour"
            choices={textColourChoices}
            defaultValue="WHITE"
            initialValue="WHITE"
            validate={required()}
          />
        </div>
        <div className={classes.column}>
          <ImageInput
            source="challengeComplete1.image"
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
            label="resources.programme.fields.challengeCompleteImage2"
          >
            <PreviewImageField />
          </ImageInput>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.challengeComplete1 && (
                <SelectInput
                  source="challengeComplete1.colour"
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
            source="progress0.image"
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
            label="resources.programme.fields.progressImage"
          >
            <PreviewImageField />
          </ImageInput>
          <SelectInput
            source="progress0.colour"
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
