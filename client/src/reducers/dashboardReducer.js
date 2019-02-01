import { DASHBOARD_REQUEST, DASHBOARD_SUCCESS, DASHBOARD_FAILURE } from '../actions/dashboardAction';

const initialState = { verify: false}

export function dashboardReducer (state = initialState, action) {
  switch (action.type) {
    case DASHBOARD_REQUEST:
      return { ...state, isFetching: true }
    case DASHBOARD_SUCCESS:
      return { ...state, verify: true, user: action.payload}
    case DASHBOARD_FAILURE:
      return { ...state}
    default:
     return {...state}
  }
}