import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from '../reducers';

const stores = createStore(reducers, applyMiddleware(reduxThunk));

export default stores;