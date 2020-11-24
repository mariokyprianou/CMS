/*
 * Jira Ticket: PDL-274
 * Created Date: Tue, 24th Nov 2020, 13:04:37 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  useTranslate,
  required,
} from 'react-admin';

// TODO: How to make the labels work properly?
const TrainerEdit = (props) => {
  const translate = useTranslate();
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          source="localisations[0].name"
          label={translate('resources.trainer.fields.trainerEnglish')}
          validate={required()}
        />
        <TextInput
          source="localisations[1].name"
          label="resources.trainer.fields.trainerHindi"
          validate={required()}
        />
        <TextInput
          source="localisations[2].name"
          label="localisations[2].locale"
          validate={required()}
        />
        <TextInput
          source="localisations[2].name"
          label={translate('localisations[2].locale')}
          validate={required()}
        />
      </SimpleForm>
    </Edit>
  );
};

export default TrainerEdit;
