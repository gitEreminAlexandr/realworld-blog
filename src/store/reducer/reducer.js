import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import articlesReducer from './articlesReducer';
import indicatorReducer from './indicatorReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  articlesReducer,
  indicatorReducer,
  userReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
