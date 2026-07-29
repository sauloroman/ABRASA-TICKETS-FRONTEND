import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      status: 'checking' // checking, authenticated, no-authenticated 
    },
    reducers: {
      
      login: ( state, { payload } ) => {
        state.user = payload.user;
        state.status = 'authenticated';
      },

      logout: ( state ) => {
        state.user = null;
        state.status = 'no-authenticated';
      },

    }
})

export const {  
  login,
  logout
} = authSlice.actions;
