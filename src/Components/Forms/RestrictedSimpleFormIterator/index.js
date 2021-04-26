/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 18:16:36 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { SimpleFormIterator } from 'react-admin';

const RestrictedFormIterator = (props) => {
  const maximumSizeReached = () => props.fields.length >= props.maximumSize;

  return (
    <SimpleFormIterator
      style={{ helperText: { root: { marginTop: 5 } } }}
      {...props}
      disableAdd={maximumSizeReached()}
    />
  );
};

export default RestrictedFormIterator;
