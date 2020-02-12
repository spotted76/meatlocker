

export const SET_CONFIG_SEL = 'CONFIG_SEL';
export const UNSET_CONFIG_SEL = 'UNCONFIG_SEL';

//function to dispatch a newly selected category item
export function setConfigSel(selectionId, type) {
  console.log('i am dispatching');
  return {
    type: SET_CONFIG_SEL,
    data: {
      id: selectionId,
      type
    }
  };
}

//function to dispatch an unset of a category item
export function unsetSelCat() {
  return {
    type: UNSET_CONFIG_SEL,
    data: null
  };
}

//Actual reducer to store the state
function reducer (state = null, action) {

  switch(action.type) {

    case SET_CONFIG_SEL:
      return action.data;

    case UNSET_CONFIG_SEL:
      return action.data; 

    default:
      return state;
  }

}

export default reducer;