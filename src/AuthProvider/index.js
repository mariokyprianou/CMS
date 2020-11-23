/*
 * Jira Ticket:
 * Created Date: Fri, 21st Feb 2020, 12:23:55 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { AuthProvider as authProviderFactory } from '@thedistance/the-core-cms-module-authentication-amplify';
import { login, logout, checkAuth, getPermissions } from './amplifyHandlers';

export default authProviderFactory({
  login,
  logout,
  checkAuth,
  getPermissions,
});
