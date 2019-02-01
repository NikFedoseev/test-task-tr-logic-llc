import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../actions/authActions';


let user = JSON.parse(localStorage.getItem('token'));
const initialState = user ? { loggedIn: true } : {}

export function authReducer (state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, ...action.payload, isFetching: true, error: false, loggedIn: false }
    case AUTH_SUCCESS:
      return { ...state, ...action.payload, isFetching: false, error: false, loggedIn: true }
    case AUTH_FAILURE:
      return { ...state, ...action.payload, isFetching: false, error: true, loggedIn: false }
    default:
     return {...state}
  }
}