/*
 * Jira Ticket: PDL-273, PDL-274
 * Created Date: Tue, 24th Nov 2020, 12:59:07 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import list from './list';
import create from './create';
import edit from './edit';
import { AccessibilityNew as icon } from '@material-ui/icons';

export default {
  name: 'trainer',
  list,
  create,
  edit,
  icon,
  options: {
    menuIndex: 1,
  },
};
