import jsonRestProvider from 'ra-data-fakerest';
import data from './data';

const dataProvider = jsonRestProvider(data, true);
export default dataProvider;
