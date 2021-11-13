import { combineReducers } from 'redux';

import articlesReducer from './articlesReducer';
import indicatorReducer from './indicatorReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  articlesReducer,
  indicatorReducer,
  userReducer,
});

export default reducer;
