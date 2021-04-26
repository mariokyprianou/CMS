/*
 * Created Date: Fri, 23rd Apr 2021, 11:26:33 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, { Fragment } from 'react';
import { ExpandMore } from '@material-ui/icons';
import {
  Collapse,
  Divider,
  List,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { withTranslate } from 'react-admin';
import { menuStyles } from 'styles';

const styles = {
  icon: { minWidth: 10 },
  sidebarIsOpen: {
    paddingLeft: 25,
    transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
  },
  sidebarIsClosed: {
    paddingLeft: 0,
    transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
  },
};

const SubMenu = ({
  handleToggle,
  sidebarIsOpen,
  isOpen,
  name,
  icon,
  children,
  dense,
  translate,
}) => {
  const classes = menuStyles();

  const header = (
    <MenuItem dense={dense} button onClick={handleToggle}>
      <ListItemIcon style={styles.icon}>
        {isOpen ? <ExpandMore /> : icon}
      </ListItemIcon>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        className={classes.root}
      >
        {translate(name)}
      </Typography>
    </MenuItem>
  );

  return (
    <Fragment>
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
        <Tooltip title={translate(name)} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
          style={sidebarIsOpen ? styles.sidebarIsOpen : styles.sidebarIsClosed}
        >
          {children}
        </List>
        <Divider />
      </Collapse>
    </Fragment>
  );
};

export default withTranslate(SubMenu);
