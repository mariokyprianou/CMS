/*
 * Jira Ticket:
 * Created Date: Thu, 10th Dec 2020, 15:05:20 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import * as React from 'react';
import { Layout } from 'react-admin';
import CustomMenu from './Menu';

const CustomLayout = (props) => <Layout {...props} menu={CustomMenu} />;

export default CustomLayout;
