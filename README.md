This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and uses the [react-admin](https://github.com/marmelab/react-admin) framework (v3).

A custom app created by The Distance for Power Digital Ltd.

## Set up

Perform the following sections to set up and run the app.

### Git Crypt

We use `git-crypt` to encrypt sensitive files, you will have to unlock the repository in order to work on the project. 

Follow the instructions for "Unlocking Encrypted Files in a Repo" found [here](https://docs.google.com/document/d/1XVZYHLLu_B1d-hrO_k9OMRARQjbiVLuRs8MKMKKSLQ4/edit) to unlock the respoitory.

### Install Packages
Install packages using:

```
yarn
```

Note that some packages are hosted in our private BitBucket repositories and use SSH to fetch, so ensure you have [SSH keys set up with your BitBucket Account](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html).

### Environment Variables

Environment variables for the project are defined in `.env`.
You must unlock the repository before changing the values in `.env`, or it will break the project (see section "Git Crypt" above).

The .env file should at MINIMUM contain the following:

* REACT_APP_AWS_APP_CLIENT: The user pool client id
* REACT_APP_AWS_AUTHENTICATION_FLOW: The auth flow for the user pool, typically "USER_PASSWORD_AUTH"
* REACT_APP_AWS_REGION: The AWS region the user pool is hosted in, typically "eu-west-2"
* REACT_APP_AWS_USER_POOL: The user pool id
* REACT_APP_GRAPHQL_URI: The uri for the GraphQL endpoint

Note that every environment variable starts with "REACT_APP_", this is because create-react-app only compiles in environment variables with this syntax, so ensure new env vars comply.

Optional Environment Variables:
* REACT_APP_USE_FAKE_DATA: A boolean variable that allows the CMS to change between using local fake data and real data, by default this is false (use real data)
* PORT: An integer defining the port number to run the app on (default 3000)

## Running the app

To run the app locally, use:

```
yarn start
```

You may also add the "PORT" variable to `.env` to run the app on a different port.

## Build and Deploy

By default, we use [AWS Amplify](https://aws.amazon.com/amplify/) to build and host our apps.

You can set up additional branches, and change the build settings and environment variables through the AWS console.
*Note that The Core v4.1 in its present state relies on private git repository modules; AWS Amplify will not by default has access through SSH to these repositories, so you will need to follow the steps in the below section to get your app building.* 

NOTE: We typically host our development branch in our AWS account and build automatically with each commit, while we usually host our staging and production branches in our client's AWS accounts and set the branches to NOT auto build on commit changes.

NOTE: In our development and staging deployed apps, we add a footer to our app that denotes the branch name and commit ID (referenced from the Amplify build environment), this is not included in production branches. Check `src/App` for exclusions and modify as required.

*TIP:* App not updated? Build Failed? Check the build logs through the AWS console, a common cause of random build failure is token exchange expiry between AWS and Bitbucket- use the "Reauthenticate App" button found under "General" on the AWS Amplify dashboard for the app.

### Amplify and Private Repositories

If you are using private git repositories in your app, you will need to perform the below steps:

1. Generate an SSH key pair by opening a terminal and running: `ssh-keygen -f deploy_key -N ""`
2. Now run `cat deploy_key | base64` and copy the output to an environment variable in the AWS Amplify Console, and name it "DEPLOY_KEY"
3. In the AWS Amplify Console, change the build settings for the project (see file at bottom of this section).
4. Copy the contents of `deploy_key.pub` and add this as an SSH key to the private git repositories in BitBucket and name the key something like "Amplify Access Key - Project Environment"
5. Redeploy your Amplify app from the console, the app should now be able to access the private repository.

Use the following template in the Build Settings for amplify.yml:

```
version: 0.1
frontend:
  phases:
    preBuild:
      commands:
        - eval "$(ssh-agent -s)"
        - echo "${DEPLOY_KEY}" | base64 --decode | ssh-add -
        - yarn install
    build:
      commands:
        - yarn run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## AuthProvider

By default, we use the AuthProvider from `the-core-cms-module-authentication-amplify`, which uses Amplify authentication by default. 

If you need to override the default auth method (e.g. to handle a custom login flow, or to authenticate using a different library), we recommend passing your own methods to the AuthProviderFactory (read more [here](https://bitbucket.org/thedistance/the-core-cms-module-authentication-amplify/src/master/README.md)).

## Login Pages

By default, we use the Login pages from `the-core-cms-module-authentication-amplify`, which uses Amplify authentication by default and supports the "FORCE_CHANGE_PASSWORD" flow imposed by AWS Cognito. 

You may supply your own Login Pages, by setting the `loginPage` prop on `<Admin \>`.

## Custom Store

This app uses a custom store. 

This is primarily to manage cursor based pagination in global (window) state.

To add custom reducers and custom sagas, instead of passing to `<Admin \>` as per the [react-admin docs](https://marmelab.com/react-admin/Admin.html#customreducers), instead pass them to the custom store during the App mounting cycle:

```
  useEffect(() => {
    const customReducers = {reducer1, reducer2, ...reducers};
    const customSagas = [saga1, saga2, ...sagas];
    const initialiseApp = async () => {
      return buildProvider().then(dataProvider => {
        const store = createStore({
          authProvider,
          dataProvider: useFakeDataProvider ? fakeDataProvider : dataProvider,
          history,
          i18nProvider: () => defaultMessages,
          customReducers,
          customSagas,
        });
        window.__getStore = () => store;
        if (useFakeDataProvider === 'true') {
          setDataProvider(fakeDataProvider);
        } else {
          setDataProvider(() => dataProvider);
        }
        return setStore(store);
      });
    };
    initialiseApp();
  }, []);
```

## DataProvider

We currently use GraphQL for querying in The Core V4+.

The DataProvider used in this project is `ra-data-graphql-simple`. 

We rebuild the dataprovider allowing query overrides and the addition of custom queries.

### Resource name mapping

You can map the names of the react-admin defined resources to the naming convention used by the backend by utilising the `resourceMap` export.

This is useful in the case where the backend and the CMS naming conventions don't quite line up, and avoids a rewrite.

Add the resources with their schema names as the key, and their react-admin defined names as the value, like so:

```
export default {
     User: "user",
     Admin: "administrator"
};
```

### Apollo Client

We use the `apollo-client` library as our GraphQL client.
The client is set up in the `apolloClient.js` file, and requires a token to authenticate, as provided by Amplify in `src/util/getToken`. 
The `src/util/getToken` should be replaced if a different authentication library is required, ensuring that the function simply returns the JSON Web Token to Apollo Client.

To create an instance of apolloClient, simply do:

```
  const client = getApolloClient({clientOptions, inMemCacheOptions});
```

where `clientOptions` are options for [`ApolloClient`](https://www.apollographql.com/docs/react/v2.5/api/apollo-client/#apolloclient), and `inMemCacheOptions` are options for [`InMemoryCache`](https://www.apollographql.com/docs/react/v2.5/advanced/caching/#configuration). 

Note that `clientOptions` and `inMemCacheOptions` are note required and `link`, `cache` and `fragmentMatcher` are already configured in `src/DataProvider/apolloClient`.

### Override a Query/Mutation

To override a query constructed by the DataProvider from the schema, use the `overrideQueries` function.

*Example*: To override the "GET_LIST" query on "User", you would add the following to `src/DataProvider/overrideQueries`:
  
  ```
   if (resource === 'Tour' && type === 'GET_LIST') {
     return {
       // Use the default query variables and parseResponse
       ...builtQuery,
       // Override the query
       query: Query.getToursQuery,
     };
   }
   ```

### Add a Custom Query/Mutation

To add a custom query or mutation, that would not be constructed by the DataProvider from the schema (e.g. doesn't follow the grammar, or is not a react-admin resource), use the `addCustomQueries` function.

*Example*: To add a custom query, you would add the following to `src/DataProvider/addCustomQueries`:
  
  ```
   if (resource === 'CmsUserInvites' && type === 'REVOKE') {
       const response = await Query.revokeInvite({ client, params });
       return response;
     }
   ```

Generally we try to name our custom queries by the action followed by the resource name, for example, in the above you would call the dataprovider with the resource set to "CmsUserInvites" and type to "REVOKE".

## GraphQL Schema

### Introspection

Introspection is generally disabled in production environments, so the CMS maintains its own copy of the GraphQL schema at `src/schema.json` which must be kept in sync with the backend services.

To generate an updated CMS schema from a backend service that _has introspection enabled_:

1. Install the `get-graphql-schema` package globally:

   ```
   npm i -g get-graphql-schema #or yarn global get-graphql-schema
   ```

2. OPTIONAL: If the endpoint requires authentication, you must create a user in the user pool authenticated against the endpoint. 

Then create an "auth-initiate.json" file in `dev_scrips` containing the user and user pool information:

```
{
  "ClientId": "<User Pool Client ID>",
  "AuthFlow": "USER_PASSWORD_AUTH",
  "AuthParameters": {
    "USERNAME": "<Username>",
    "PASSWORD": "<Password>"
  }
}
```

3. Dump the schema to a file by running the following command from the root of the project:
   ```
   ./dev_scripts/build-cms-schema.sh
   ```

### Generating Schema Fragments

In some cases, the schema will use fragments. These pieces of the schema are not detected through Introspection as per the previous section, and so to retrieve information on the fragments you will have to perform the following actions:

You will need `node` to run the fragment generating script. You can download it [here](https://nodejs.org/en/download/).
 
1. Install node-fetch: 

```
npm i -g node-fetch #or yarn global node-fetch
```

2. OPTIONAL: If the endpoint is authenticated, as described in the previous section, you will need a user in the user pool and an "auth-initiate.json" file in `dev_scrips` containing the following information:

```
{
  "ClientId": "<User Pool Client ID>",
  "AuthFlow": "USER_PASSWORD_AUTH",
  "AuthParameters": {
    "USERNAME": "<Username>",
    "PASSWORD": "<Password>"
  }
}
```

3. Generate the fragment file by running the following command from the root of the project directory:

```
./dev_scripts/build-schema-fragments.sh
```

4. The generated JSON will be found in `src/DataProvider/fragmentTypes.json`.

## Pagination for Cognito/DynamoDB

Cognito and DynamoDB use cursors to define the limits on data, so our usual `page` and `perPage` props won't blend with this pagination.

If you need to support cursor based pagination, there is a custom pagination component already in `src/Components/CursorPagination`, and an example of implementing the component in `src/Users`.

In order to add in the logic to manage the cursors, you will need to do two things:

1. Add a reducer to manage the cursor state for your resource
2. Add a custom query to the DataProvider to handle the cursor in your call

See below sub-sections for more info.

### Adding a Pagination Reducer

*An example of pagination reducer implementation can be found in `src/App`*

To add your pagination reducer, import the `paginationReducerFactory` from `src/reducers` and pass the resource name you want to store pagination cursors for. Note that the name passed in MUST match the resource name declared within `<Admin />` e.g. 

```
  const customReducers = {
      userPagination: paginationReducerFactory('user'),
    };

    ...

  <Admin
    {...props}
  >
    {permissions => [
      <Resource name="user" {...User} options={{ label: 'App Users' }} />,
    ]}
  </Admin>
```

### Adding a Custom Query (List with Cursors)

*An exmaple of a custom query using cursors can be found in `src/DataProvider/queries/User/GET_LIST`*

There's a couple of steps that need to happen for the pagination to work; 

Firstly, the current page of the resource needs to be fetched in order to determine which cursor to send (note `null` cursors indicate the first and last known page). e.g.

```
// in src/DataProvider/queries/User/GET_LIST.js
const store = window.__getStore();
const page = currentPage('user'); // pass the resource name
const cursorToSend = queryCursor('userPagination', page); // pass the reducer name
const response = await client.query({
  query: getListUserQuery,
  fetchPolicy: 'network-only',
  variables: {
    cursor: cursorToSend,
    perPage: params.pagination.perPage,
    filter: params.filter,
  },
```

Secondly, the new cursor for the next page needs to be updated in our global state. e.g.

```
// in src/DataProvider/queries/User/GET_LIST.js
const { cursor } = response.data.list;
const action = await nextCursor(cursor, page);
store.dispatch(action);
```

Note that in the returned response, we set the total count to a fixed number, this is just to comply with the DataProvider's expected response for a GET_LIST/getList type.

## Translations

### Adding Custom Messages
To add your own translations to the project (such as labels on buttons, page headers), add your entries under `custom` in `src/i18n`, e.g.:

```
const englishMessages = {
  ...raEnglishMessages,
  custom: {
     resourceName: {
       example: {
         helloWorld: 'Hello, World',
       },
     },
   },
};
```

You can then use the `useTranslate()` hook from react-admin to access the translations in the app:

```
  import { useTranslate } from 'react-admin';

  const translate = useTranslate();

  translate(custom.resourceName.example.helloWorld) // "Hello, World"
```

### Adding Locales

To add locales, add support to change locales and adding a different default locale, you will need to change `src/i18n`. See the [react-admin docs](https://marmelab.com/react-admin/Translation.html) for full details.

## Themeing

In this project, we write a custom MUI theme (following their [documentation](https://material-ui.com/customization/themes/)) in `src/theme` and pass this in to `<Admin />`. For full details, see the [react-admin docs](https://marmelab.com/react-admin/Theming.html).