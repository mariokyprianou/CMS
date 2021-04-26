/*
 * Jira Ticket:
 * Created Date: Thu, 201 Nov 2019, 16:57:48 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import buildGraphqlProvider, { buildQuery } from 'ra-data-graphql-simple';
import getApolloClient from './apolloClient';
import { __schema as schema } from './schema';
// resource name mapping
import resources from './resourceMap';
// custom queries
import overrideQueries from './overrideQueries';
import addCustomQueries from './customQueries.js';
import decorateResponse from './decorateResponse';

const customBuildQuery = (introspection) => (type, resource, params) => {
  const builtQuery = buildQuery(introspection)(type, resource, params);
  const overriddenQuery = overrideQueries({
    type,
    resource,
    params,
    builtQuery,
  });
  if (overriddenQuery) {
    return {
      // Use the default query variables and parseResponse
      ...builtQuery,
      // Override the query
      query: overriddenQuery,
    };
  }

  return builtQuery;
};

const createProvider = async () => {
  const client = await getApolloClient(); // add options to client: {clientOptions, inMemCacheOptions}

  const gqlProvider = await buildGraphqlProvider({
    client,
    buildQuery: customBuildQuery,
    introspection: { schema },
  });

  const dataProviders = [
    // real data provider
    {
      dataProvider: gqlProvider,
      resources,
    },
  ];

  return async (type, resource, params) => {
    const dataProviderMapping = dataProviders.find(
      (dp) => !dp.resources || dp.resources.hasOwnProperty(resource)
    );

    if (dataProviderMapping.resources) {
      resource = dataProviderMapping.resources[resource];
    }

    const customQueries = await addCustomQueries({
      type,
      resource,
      params,
      client,
    });

    if (customQueries) {
      return customQueries;
    }

    // catch any errors from apollo-client and wrap them to remove GraphQL error pre-pend
    try {
      const result = await dataProviderMapping.dataProvider(
        type,
        resource,
        params
      );
      return decorateResponse({
        type,
        resource,
        result,
      });
    } catch (e) {
      if (e.graphQLErrors && e.graphQLErrors.length) {
        const [error] = e.graphQLErrors;
        const message = error.message;
        throw new Error(message);
      }
      throw e;
    }
  };
};

let provider = null;
const getOrCreateProvider = async () => {
  if (!provider) {
    provider = await createProvider();
  }

  return provider;
};

export default getOrCreateProvider;
