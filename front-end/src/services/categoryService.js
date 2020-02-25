
import axios from 'axios';

export async function putWithToken(URI, data, token) {

  const bearer = `Bearer ${token}`;

  const configs = {
    headers: {
      Authorization: bearer
    }
  };

  const result = await axios.post(URI, data, configs);

  console.log('put result:  ', result);

  return result.data;
}