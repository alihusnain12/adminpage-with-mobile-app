// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './loginSlice'; // Import the reducer from loginSlice.js

export const store = configureStore({
  reducer: {
    loginToken: authReducer, // Use authReducer for loginToken state
  },
});
