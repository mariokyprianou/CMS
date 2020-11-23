import React from 'react';
import { Button } from 'react-admin';

const ActionButton = ({
  name,
  disabled,
  icon,
  style,
  onClick,
  addLabel,
  basePath,
  variant = 'contained',
  ...rest
}) => {
  return (
    <Button
      label={name}
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      {...rest}
    >
      {icon}
    </Button>
  );
};

ActionButton.defaultProps = { addLabel: false };

export default ActionButton;
