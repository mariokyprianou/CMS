/*
 * Jira Ticket: PDL-275
 * Created Date: Tue, 24th Nov 2020, 15:15:50 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import list from './list';
import edit from './edit';
import { Assignment as icon } from '@material-ui/icons';

// TODO: Add a create route in here too.
export default {
  name: 'programme',
  list,
  edit,
  icon,
};
