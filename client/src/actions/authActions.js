import axios from 'axios';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export function authenticate(payload) {
  return dispatch => {
    dispatch({
      type: AUTH_REQUEST,
      payload: payload
    })
    axios.post('/authenticate', payload)
    .then(response => {
      if(response.status == '200') {
        localStorage.setItem('token', JSON.stringify(response.data));
        dispatch({
          type: AUTH_SUCCESS,
          payload: payload,
        })
      } else {
        dispatch({
          type: AUTH_FAILURE,
        })
      }
    })
    .catch(err => {
      dispatch({
        type: AUTH_FAILURE,
        payload: payload,
        err: err,
      })
    })
  }
}