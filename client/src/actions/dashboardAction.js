import axios from 'axios';

export const DASHBOARD_REQUEST = 'DASHBOARD_REQUEST';
export const DASHBOARD_SUCCESS = 'DASHBOARD_SUCCESS';
export const DASHBOARD_FAILURE = 'DASHBOARD_FAILURE';

export function checkToken(payload) {
  return dispatch => {
    dispatch({
      type: DASHBOARD_REQUEST
    })
    const config = {
      headers: {'Authorization': payload}
    };
    const bodyParameters = {
      key: "value"
    }
    axios.post('/', bodyParameters, config)
    .then(response => {
      console.log(response)
      dispatch({
        type: DASHBOARD_SUCCESS,
        payload: response.data.user
      })
    })
    .catch(err => {
      localStorage.removeItem('token');
      dispatch({
        type: DASHBOARD_FAILURE
      })
    })
  }
}