import { combineReducers } from 'redux';
import articlesReduse from './articlesReduser';
import indicatorReduse from './indicatorReduse';
import userReduser from './userReduser';

const reduser = combineReducers({
  articlesReduse,
  indicatorReduse,
  userReduser,
});

export default reduser;
