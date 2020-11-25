/*
 * Jira Ticket: PDL-362
 * Created Date: Wed, 25th Nov 2020, 11:43:54 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { required, NumberInput } from 'react-admin';
import InputAdornment from '@material-ui/core/InputAdornment';

const PercentageInput = ({ label, source }) => (
  <NumberInput
    min={0}
    max={100}
    label={label}
    source={source}
    validate={required()}
    options={{
      InputProps: {
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      },
    }}
  />
);

export default PercentageInput;
