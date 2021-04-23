/*
 * Created Date: Fri, 23rd Apr 2021, 10:06:04 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import list from './list';
import edit from './edit';
import create from './create';
import { WatchLater as icon } from '@material-ui/icons';

export default {
  name: 'onDemandWorkout',
  list,
  icon,
  edit,
  create,
  options: {
    subMenu: true,
  },
};
