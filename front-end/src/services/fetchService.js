
import axios from 'axios';

export const DEFAULT_URI = '/api/category';
export const DEFAULT_CAT_URI = '/api/category';
export const DEFAULT_ITEM_URI = '/api/item';


/**
 * Adds a Bearer token to the passed configObj
 * @param {Adds an } configObj - Config object to add the token to
 * @param {*} authToken - passed token
 */
export function addBearerToken(configObj, authToken) {
  
  const bearer = `Bearer ${authToken}`;

  if ( !configObj.headers )
  {
    configObj.headers = {};
  
  }

  configObj.headers = { ...configObj.headers, Authorization: bearer };

  return configObj;
}

export async function retrieve(URI) {

  const result = await axios.get(URI);
  return result.data;

}

export async function retrieveWithToken(URI, token) {

  const bearer = `Bearer ${token}`;

  const configs = {
    headers: {
      Authorization: bearer
    }
  };

  const result = await axios.get(URI, configs);
  return result.data;

}
