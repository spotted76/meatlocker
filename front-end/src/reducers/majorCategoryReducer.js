


export const SET_MAJOR_CATS = 'SET_MAJOR_CATS';
export const ADD_MAJOR_CAT = 'ADD_MAJOR_CAT';
export const DEL_MAJOR_CAT = 'DEL_MAJOR_CAT';


// Action to set the top level category data
export function setTopLevelCat(categoryData) {

  return {
    type: SET_MAJOR_CATS,
    data: categoryData
  };

}

// Action to add a single item to the top level data
export function addTopLevelCat(categoryData) {
  return {
    type: ADD_MAJOR_CAT,
    data: categoryData
  };
}

function reducer (state = [], action) {
  
  switch ( action.type ){

    case SET_MAJOR_CATS:
      return [...action.data]; // set the state to the new data
    case ADD_MAJOR_CAT:
      // Add a new item, concat is called to return a new array
      return state.concat({
        ...action.data.categoryName,
        childCategories : [...action.data.childCategories],
        items: [...action.data.items]
      });
    default:
      return state;

  }
}
export default reducer;