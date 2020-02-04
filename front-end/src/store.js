
import { combineReducers, createStore } from 'redux';

//Import each reducer
import userReducer from './reducers/userReducer';
import majorCategories from './reducers/majorCategoryReducer';


//Combine all reducers into a single store
const reducers = combineReducers({
  userReducer,
  majorCategories
});

const store = createStore(reducers);

export default store;