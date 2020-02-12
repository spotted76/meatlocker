

export const SET_SEL_CAT = 'SET_SELECTED_CATEGORY';
export const UNSET_SEL_CAT = 'UNSET_SELECTED_CATEGORY';

//function to dispatch a newly selected category item
export function setSelCat(categoryId) {
  console.log('i am dispatching');
  return {
    type: SET_SEL_CAT,
    data: {
      id: categoryId,
      type: 'category'
    }
  };
}

//function to dispatch an unset of a category item
export function unsetSelCat() {
  return {
    type: UNSET_SEL_CAT,
    data: null
  };
}

//Actual reducer to store the state
function reducer (state = null, action) {

  console.log('did I get in the reducer?');

  switch(action.type) {

    case SET_SEL_CAT:
      console.log('returning ', action.data);
      return action.data;

    case UNSET_SEL_CAT:
      return action.data; 

    default:
      return state;
  }

}

export default reducer;