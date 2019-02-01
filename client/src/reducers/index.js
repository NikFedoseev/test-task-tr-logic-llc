import { combineReducers } from 'redux';
import { registerReducer } from './registerReducer';
import { authReducer } from './authReducer';
import { dashboardReducer } from './dashboardReducer';

export const rootReducer = combineReducers({
  user: registerReducer,
  auth: authReducer,
  dashboard: dashboardReducer
})