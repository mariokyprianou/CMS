/*
 * Jira Ticket: PDL-128
 * Created Date: Thu, 26th Nov 2020, 12:00:29 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import edit from './edit';
import list from './list';
import create from './create';
import { List as icon } from '@material-ui/icons';

export default {
  name: 'exerciseCategory',
  list,
  edit,
  create,
  icon,
};
