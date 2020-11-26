/*
 * Jira Ticket: PDL-362
 * Created Date: Wed, 25th Nov 2020, 12:23:52 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import { EditButton } from 'react-admin';

const ChallengeTab = (props) => {
  console.log('props: ', props);
  // TODO: How to pull a list of Challenges in a Tab View.
  return (
    <Fragment>
      <div>List of Challenges should go here</div>
      <EditButton />
    </Fragment>
  );
};

export default ChallengeTab;
