/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 15:13:10 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, required, SimpleFormIterator, TextInput } from 'react-admin';
import { MultiLanguageForm } from 'Components/Forms';
import RichTextInput from 'ra-input-rich-text';
import { columnStyles } from 'styles';

const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANG.split(' ');

const ConfigurationPage = ({ staticContext, ...props }) => {
  const classes = columnStyles();
  return (
    <Edit
      {...props}
      id="1"
      basePath="/configuration"
      resource="configuration"
      title="resources.configuration.name"
    >
      <MultiLanguageForm
        supportedLanguages={supportedLanguages}
        allowLanguageRemoval={false}
        extendToolbar={0}
        sourcesToSkipRecursion={['image', 'downloads']} // skip nested fields to avoid breaking on recursive children
      >
        <RichTextInput source="termAndConditions" validation={required()} />
        <RichTextInput source="privacyPolicy" validation={required()} />
        {/* TODO: fix below, simple form iterator might not work for us */}
        {/* <SimpleFormIterator>
          <TextInput source="title" />
          <TextInput source="text" />
        </SimpleFormIterator> */}
      </MultiLanguageForm>
    </Edit>
  );
};

export default ConfigurationPage;
