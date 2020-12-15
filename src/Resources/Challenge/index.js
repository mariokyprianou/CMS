/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 09:17:46 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import create from './create';
import edit from './edit';

export default {
  name: 'challenge',
  create,
  edit,
  options: { excludeFromMenu: true },
};
