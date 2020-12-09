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
// fake data
import jsonRestProvider from 'ra-data-fakerest';
import data from './fakeData';
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
    {
      dataProvider: jsonRestProvider(data, true),
      //add resources here to override with fake data
      resources: {
        administrator: 'administrator',
        user: 'user',
        trainer: 'trainer',
        programme: 'programme',
        challenge: 'challenge',
        exerciseCategory: 'exerciseCategory',
        exercise: 'exercise',
        feedback: 'feedback',
        configuration: 'configuration',
        helpMeChoose: 'helpMeChoose',
        workout: 'workout',
      },
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

    // Fakedata Dataprovider type mapping
    if (typeof dataProviderMapping.dataProvider === 'object') {
      switch (type) {
        case 'GET_LIST':
          type = 'getList';
          break;
        case 'GET_ONE':
          type = 'getOne';
          break;
        case 'GET_MANY':
          type = 'getMany';
          break;
        case 'GET_MANY_REFERENCE':
          type = 'getManyReference';
          break;
        case 'UPDATE':
          type = 'update';
          break;
        case 'UPDATE_MANY':
          type = 'updateMany';
          break;
        case 'CREATE':
          type = 'create';
          break;
        case 'DELETE':
          type = 'delete';
          break;
        case 'DELETE_MANY':
          type = 'deleteMany';
          break;
        default:
          throw new Error('Unsupported query type');
      }

      const result = await dataProviderMapping.dataProvider[type](
        resource,
        params
      );

      return decorateResponse({
        type,
        resource,
        result,
      });
    }

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
