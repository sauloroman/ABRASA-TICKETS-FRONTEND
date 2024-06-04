import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
      profile: null
    },
    reducers: {
      setProfile: ( state, { payload } ) => {
        state.profile = payload;
      }
    }
})

export const { setProfile } = profileSlice.actions;
