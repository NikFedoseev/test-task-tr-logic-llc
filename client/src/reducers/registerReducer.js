import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/registerActions';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    username: '',
    password: '',
    submitted: false,
    errors: null,
    isFetching: false,
};

export function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...action.payload, submitted: true, isFetching: true };
    case REGISTER_SUCCESS:
      return { ...action.payload, submitted: true, isFetching: false, errors: null, redirect: action.redirect };  
    case REGISTER_FAILURE:
      return { ...action.payload, submitted: true, isFetching: false, errors: action.message };
    default:
      return state;
  } 
}