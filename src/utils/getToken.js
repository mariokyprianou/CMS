/*
 * Jira Ticket:
 * Created Date: Fri, 17th Jan 2020, 15:58:02 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { Auth } from 'aws-amplify';

export default () => {
  return Auth.currentSession()
    .then((response) => {
      return response.getAccessToken().getJwtToken();
    })
    .catch((error) => {
      throw new Error('Failed to set dataprovider auth header ' + error);
    });
};
