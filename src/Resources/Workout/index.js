/*
 * Jira Ticket: PDL-276
 * Created Date: Mon, 30th Nov 2020, 15:52:11 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import list from './list';
import edit from './edit';
import create from './create';
import { WatchLater as icon } from '@material-ui/icons';

export default {
  name: 'workout',
  list,
  icon,
  edit,
  create,
};
