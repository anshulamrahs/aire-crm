import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers/rootReducer';

// Configure redux-persist
const persistConfig = {
  key: 'root', // key for localStorage or sessionStorage
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
