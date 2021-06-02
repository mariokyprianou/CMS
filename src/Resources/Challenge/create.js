/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 12:32:43 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  Create,
  FormDataConsumer,
  ImageInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { PreviewImageField } from 'Components/Fields';
import { NoScrollNumberInput as NumberInput } from 'Components/Inputs';
import { InputAdornment } from '@material-ui/core';
import { challengeTypeChoices, challengeUnitTypeChoices } from 'utils/choices';
import { nonNegativeNonZeroInt } from 'utils/validation';
import { maxImageSize } from 'utils/helpers';
import { onDropRejected as onFileDropRejected } from 'utils';

const durationValidation = [required(), nonNegativeNonZeroInt];

const ChallengeCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <LocalisedComponentCloner
          direction="row"
          component={<TextInput validate={required()} />}
          source="name"
        />
        <SelectInput
          source="type"
          choices={challengeTypeChoices}
          validate={required()}
        />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.type === 'COUNTDOWN' && (
              <NumberInput
                source="duration"
                validate={durationValidation}
                {...rest}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">seconds</InputAdornment>
                  ),
                }}
              />
            )
          }
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.type !== 'STOPWATCH' && (
              <SelectInput
                {...rest}
                source="unitType"
                validate={required()}
                choices={challengeUnitTypeChoices}
              />
            )
          }
        </FormDataConsumer>
        <ImageInput
          source="image"
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
        <LocalisedComponentCloner
          fullWidth
          component={<TextInput multiline validate={required()} />}
          source="fieldDescription"
        />
        <LocalisedComponentCloner
          fullWidth
          component={<TextInput multiline validate={required()} />}
          source="fieldTitle"
        />
      </SimpleForm>
    </Create>
  );
};
export default ChallengeCreate;
