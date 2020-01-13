

class Config {

  //Returns the session duration in days
  static get sessionDuration() {
    return 1;
  }

  //Returns the name of the session to store
  static get sessionName() {
    return 'mlr_cookie';
  }

}

export default Config;