
export const SET_DETAIL_SELECTED = 'SET_DETAIL_SELECTED';
export const UNSET_DETAIL_SELECTED = 'UNSET_DETAIL_SELECTED';

export function setDetailSelection(id, type) {
  return {
    type: SET_DETAIL_SELECTED,
    data: {
      id,
      type
    }
  };
}

export function unsetDetailSelection() {
  return {
    type: UNSET_DETAIL_SELECTED,
    data: null
  };
}


//Just store the ID for the selection, it will get looked up later
function reducer(state = null, action) {

  switch(action.type) {
    case SET_DETAIL_SELECTED:
      return action.data;
    case UNSET_DETAIL_SELECTED:
      return null;
    default :
      return state;
  }

}

export default reducer;