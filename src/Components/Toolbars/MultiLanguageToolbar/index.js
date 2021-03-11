/*
 * Jira Ticket:
 * Created Date: Thu, 19th Nov 2020, 19:28:58 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { DeleteButton, SaveButton, Toolbar } from 'react-admin';
import { toolbarStyles } from 'styles';

const SanitizedDeleteButton = ({ onSave, ...rest }) => (
  <DeleteButton {...rest} />
);

const MultiLanguageToolbar = ({
  invalid,
  isInvalid,
  saving,
  isSaving,
  ...props
}) => {
  const {
    hideDelete = false,
    className,
    onSave,
    redirect,
    deleteRedirect = 'list',
    extend,
    ...rest
  } = props;
  const classes = toolbarStyles(extend);
  return (
    <Toolbar className={classes.root} {...rest}>
      <SaveButton invalid={isInvalid} saving={isSaving} redirect={redirect} />
      {hideDelete ? null : (
        <SanitizedDeleteButton redirect={deleteRedirect} undoable={false} />
      )}
    </Toolbar>
  );
};

export default MultiLanguageToolbar;
