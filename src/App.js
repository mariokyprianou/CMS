import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './DataProvider';

// user
import UserList from './User/list';

const App = () => (
  <Admin dataProvider={dataProvider} title="My App">
    <Resource name="user" list={UserList} />
  </Admin>
);

export default App;
