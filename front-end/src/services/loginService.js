

import axios from 'axios';

const BASE_URI = '/api/login';

class LoginServices {


  /*
    Sends an XHRPost to the server, attempting to log the user in
  */
  static async login(username, password) {

    let result = null;

    try {
      const resp = await axios.post(BASE_URI, { username, password });

      if (resp.data) {
        result = resp.data;
      }

    }
    catch(err) {
      console.log('error when performing post to ', BASE_URI);
      console.log(err);
    }

    return result;
  }

}

export default LoginServices;