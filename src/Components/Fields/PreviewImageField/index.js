/*
 * Jira Ticket:
 * Created Date: Wed, 20th Jan 2021, 12:27:20 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import { useTranslate } from 'react-admin';
import { previewImageStyles } from 'styles';

const PreviewImageField = ({
  margin,
  isParent = false,
  source,
  maxHeight,
  value,
  ...props
}) => {
  const classes = previewImageStyles({ margin, maxHeight });
  const translate = useTranslate();
  const { record } = props;
  const image =
    record &&
    (isParent && value
      ? value.url || value.rawFile
      : record.url || record.undefined || record.rawFile);
  if (image) {
    return (
      <a href={image} target="_blank" rel="noopener noreferrer">
        <img
          src={image}
          className={classes.root}
          alt={translate('error.field.image.notFound')}
        />
      </a>
    );
  } else if (record && record[source]) {
    return (
      <a href={record[source]} target="_blank" rel="noopener noreferrer">
        <img
          src={record[source]}
          className={classes.root}
          alt={translate('error.field.image.notFound')}
        />
      </a>
    );
  } else if (record) {
    // record is a url
    return (
      <a href={record} target="_blank" rel="noopener noreferrer">
        <img
          src={record}
          className={classes.root}
          alt={translate('error.field.image.notFound')}
        />
      </a>
    );
  }

  return null;
};

export default PreviewImageField;
