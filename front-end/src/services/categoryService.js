
import axios from 'axios';

export async function postWithToken(URI, data, token) {

  const bearer = `Bearer ${token}`;

  const configs = {
    headers: {
      Authorization: bearer
    }
  };

  const result = await axios.post(URI, data, configs);
  return result.data;
}