// redux/loginSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    
  },
});

export const { setToken } = authSlice.actions; // Export the setToken action
export default authSlice.reducer; // Export the reducer
