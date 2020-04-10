
import axios from 'axios';

export const DEFAULT_URI = '/api/category';
export const DEFAULT_CAT_URI = '/api/category';
export const DEFAULT_ITEM_URI = '/api/item';

/*
  Generic post call. Change this to have token be conditional
 */
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

/*
  Generic patch call, change this to have token be conditional
*/
export async function patchWithToken(URI, data, token) {

  const bearer = `Bearer ${token}`;

  const configs = {
    headers: {
      Authorization: bearer
    }
  };

  const result = await axios.patch(URI, data, configs);
  return result.data;

}

/*
  Generic put call, change this to have token be conditional
*/
export async function putWithToken(URI, data, token) {

  const bearer = `Bearer ${token}`;

  const configs = {
    headers: {
      Authorization: bearer
    }
  };

  const result = await axios.put(URI, data, configs);
  return result.data;

}

/*
  Generic delete call, change this to have token be conditional
*/
export async function deleteWithToken(URI, token) {

  const bearer = `Bearer ${token}`;

  const configs = {
    headers: {
      Authorization: bearer
    }
  };

  const result = await axios.delete(URI, configs);
  return result.data;

}