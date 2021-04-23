/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 12:32:46 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  Edit,
  DeleteButton,
  FormDataConsumer,
  NumberInput,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { TemplateToolbar } from 'Components/Toolbars';
import { InputAdornment } from '@material-ui/core';
import { challengeTypeChoices, challengeUnitTypeChoices } from 'utils/choices';
import { nonNegativeNonZeroInt } from 'utils/validation';

const durationValidation = [required(), nonNegativeNonZeroInt];

const ChallengeToolbar = ({ classes, deleteRedirect, ...props }) => {
  return (
    <TemplateToolbar {...props}>
      <SaveButton />
      <DeleteButton redirect={deleteRedirect} />
    </TemplateToolbar>
  );
};

const ChallengeEdit = (props) => {
  const {
    location: { state },
  } = props;
  return (
    <Edit mutationMode="optimistic" {...props}>
      <SimpleForm
        toolbar={
          <ChallengeToolbar
            deleteRedirect={
              state ? `/programme/${state.programmeId}/2` : '/programme' //custom toolbar to redirect delete back to programmeId
            }
          />
        }
        redirect={false} //do not redirect on save
      >
        <LocalisedComponentCloner
          direction="row"
          component={<TextInput validate={required()} />}
          source="name"
        />
        <SelectInput
          source="type"
          choices={challengeTypeChoices}
          validate={required()}
          disabled={true}
        />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.type === 'COUNTDOWN' ? (
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
            ) : formData.type === 'OTHER' ? (
              <SelectInput
                {...rest}
                source="unitType"
                disabled={true}
                validate={required()}
                choices={challengeUnitTypeChoices}
              />
            ) : null
          }
        </FormDataConsumer>
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
    </Edit>
  );
};
export default ChallengeEdit;
