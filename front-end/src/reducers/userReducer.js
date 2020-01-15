

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';


//Action to add a user to the store
export function userAdd(userData)
{
  return {
    type: ADD_USER,
    data: userData
  };
} 

//action to remove a user from the store
export function userRemove() {
  return {
    type: REMOVE_USER
  };
}

// //Bound action to dispatch and add a user
// export const addUser = userData => dispatch(userAdd(userData));

// //Bound action to dispatch and remove a user
// export const removeUser = () => dispatch(userRemove());

//Define the actual store
function reducer (state = null, action) {

  switch(action.type) {
    case ADD_USER: //New user data added, so just return it as the state
      return action.data;
    default:
      return state; // No user, so return null for the user data
  }

}

export default reducer;