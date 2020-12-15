/*
 * Jira Ticket:
 * Created Date: Tue, 15th Dec 2020, 12:17:06 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Button } from 'react-admin';
import { Link } from 'react-router-dom';
import { linkButton } from 'styles';

const LinkButton = ({
  basePath,
  name,
  pathname,
  state,
  icon,
  addLabel,
  ...rest
}) => {
  const classes = linkButton();
  return (
    <Button
      className={classes.root}
      component={Link}
      to={{
        pathname,
        state,
      }}
      label={name}
      {...rest}
    >
      {icon}
    </Button>
  );
};

LinkButton.defaultProps = { addLabel: false };

export default LinkButton;
