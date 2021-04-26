/*
 * Jira Ticket:
 * Created Date: Fri, 17th Jan 2020, 16:08:49 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import schemaFragments from './fragmentTypes.json';
import { amplifyHandlers } from '@thedistance/the-core-cms-module-authentication-amplify';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // add graphql error handling here
  }

  if (networkError) {
    // add network error handling here
  }
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  schemaFragments,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await amplifyHandlers.getToken();
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) =>
      key === '__typename' ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation).map((data) => {
    return data;
  });
});

const apolloClient = (options = {}) => {
  const { clientOptions = {}, inMemCacheOptions = {} } = options;
  return new ApolloClient({
    link: ApolloLink.from([cleanTypeName, authLink, errorLink, httpLink]),
    cache: new InMemoryCache({ fragmentMatcher, ...inMemCacheOptions }),
    ...clientOptions,
  });
};

export default apolloClient;
