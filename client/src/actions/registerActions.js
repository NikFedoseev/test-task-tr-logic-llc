import axios from 'axios';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function register(payload) {
  return dispatch => {
    dispatch({
      type: REGISTER_REQUEST,
      payload: payload
    })

    axios.post('/register', payload)
    .then(response => {
      if(response.data.register === 'ok') {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: payload,
        })
        setTimeout( () =>
          dispatch({
            type: REGISTER_SUCCESS,
            payload: payload,
            redirect: true
          }), 3000)
      } else {
        dispatch({
          type: REGISTER_FAILURE,
          payload: payload,
          message: response.data.message
        })
      }
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAILURE,
        payload: payload,
        message: err.message,
      })
    })
  }
}