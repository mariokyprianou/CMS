/*
 * Jira Ticket:
 * Created Date: Wed, 20th Jan 2021, 12:27:20 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import { FileField, useTranslate } from 'react-admin';

const PreviewFileField = (props) => {
  const translate = useTranslate();
  const { record, value } = props;
  if (record) {
    if (record.rawFile) {
      return (
        <FileField
          record={record}
          source="undefined"
          title={`${record.rawFile.name}`}
          target="_blank"
        />
      );
    } else if (record.url) {
      return (
        <FileField
          record={record}
          source="url"
          title={`${record.fileName}`}
          target="_blank"
        />
      );
    }
  } else if (value) {
    return (
      <FileField
        record={value}
        source="url"
        title={`${value.fileName}`}
        target="_blank"
      />
    );
  }

  return translate('error.field.file.notFound');
};

export default PreviewFileField;
