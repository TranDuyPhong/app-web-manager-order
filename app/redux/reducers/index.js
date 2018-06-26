import { combineReducers } from 'redux';

import categoryReducer from './category';
import foodReducer from './food';
import tableReducer from './table';
import revenueReducer from './revenue';
import billReducer from './bill';

const reducers = combineReducers({
    category: categoryReducer,
    food: foodReducer,
    table: tableReducer,
    revenue: revenueReducer,
    bill: billReducer
});

export default reducers;