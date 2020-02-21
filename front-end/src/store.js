
import { combineReducers, createStore } from 'redux';

//Import each reducer
import userReducer from './reducers/userReducer';
import configureSelected from './reducers/configureSelected';


//Combine all reducers into a single store
const reducers = combineReducers({
  userReducer,
  configureSelected,
});

const store = createStore(reducers);

export default store;