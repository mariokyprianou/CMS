/*
 * Jira Ticket: PDL-271
 * Created Date: Tue, 24th Nov 2020, 08:39:05 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import list from './list';
import create from './create';
import edit from './edit';
import { PersonOutline as icon } from '@material-ui/icons';

export default {
  name: 'administrator',
  list,
  create,
  edit,
  icon,
  options: {
    menuIndex: 1,
  },
};
