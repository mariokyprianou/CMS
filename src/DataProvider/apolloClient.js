/*
 * Jira Ticket:
 * Created Date: Fri, 17th Jan 2020, 16:08:49 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import schemaFragments from './fragmentTypes.json';
import getToken from 'utils/getToken';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  schemaFragments,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken(); // change this to use another auth library
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

const apolloClient = (options = {}) => {
  const { clientOptions = {}, inMemCacheOptions = {} } = options;
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({ fragmentMatcher, ...inMemCacheOptions }),
    ...clientOptions,
  });
};

export default apolloClient;
