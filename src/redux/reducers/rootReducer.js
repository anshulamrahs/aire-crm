// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from '../features/user/userSlice';
import filterReducer from '../features/leads/filterSlice';

const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
});

export default rootReducer;
