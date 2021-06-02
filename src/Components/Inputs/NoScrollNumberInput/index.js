/*
 * Created Date: Wed, 2nd Jun 2021, 10:19:52 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import { NumberInput } from 'react-admin';
import './index.css';

// client requested to hide arrows/spinners on number input
// and also remove mouse wheel scroll

const NoScrollNumberInput = (props) => {
  return (
    <NumberInput {...props} onWheel={() => document.activeElement.blur()} />
  );
};

export default NoScrollNumberInput;
