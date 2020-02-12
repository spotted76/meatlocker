
import { combineReducers, createStore } from 'redux';

//Import each reducer
import userReducer from './reducers/userReducer';
import majorCategories from './reducers/categoryReducer';
import configureSelected from './reducers/configureSelected';


//Combine all reducers into a single store
const reducers = combineReducers({
  userReducer,
  majorCategories,
  configureSelected
});

const store = createStore(reducers);

export default store;