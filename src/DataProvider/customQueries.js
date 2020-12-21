/*
 * Jira Ticket:
 * Created Date: Fri, 17th Jan 2020, 16:14:54 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import * as Query from './queries';
import decorateResponse from './decorateResponse';

export default async ({ type, resource, params, client }) => {
  var result;
  if (resource === 'Configuration') {
    if (type === 'GET_ONE') {
      result = await Query.getOneConfig({ client, params });
    }
    if (type === 'UPDATE' || type === 'CREATE') {
      result = await Query.updateConfig({ client, params });
    }
  }
  return decorateResponse({
    type,
    resource,
    result,
  });
};
