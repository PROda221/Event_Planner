import {combineReducers} from 'redux';
import App from './app.reducer';
import Auth from './auth.reducer';

const appReducer = combineReducers({
  App,
  Auth,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
