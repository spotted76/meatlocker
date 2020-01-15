
import { combineReducers, createStore } from 'redux';

//Import each reducer
import userReducer from './reducers/userReducer';


//Combine all reducers into a single store
const reducers = combineReducers({
  userReducer
});

const store = createStore(reducers);

export default store;