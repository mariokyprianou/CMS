/*
 * Jira Ticket: PDL-391
 * Created Date: Mon, 30th Nov 2020, 12:31:19 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import create from './create';
import { Notifications as icon } from '@material-ui/icons';

// TODO: Show a hybrid Create with a list screen underneath ??
export default {
  name: 'notification',
  create,
  icon,
};
