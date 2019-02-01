import axios from 'axios';

let m = 5;
const checkJWT = async () => {
  return await axios.post('/', JSON.stringify(localStorage.getItem('token')))
  .then( response => {
    return response.data.message 
  })
}

const n = async function a () {
  let k = await checkJWT();
  m = k;
}

console.log(n() && m);

export default checkJWT;