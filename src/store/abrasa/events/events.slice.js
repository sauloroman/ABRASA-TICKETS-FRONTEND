import { createSlice } from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
      filter: 'todos',
      total: 0,
      page: 1,
      totalPages: 0,
      event: {},
      events: [],
    },
    reducers: {

      setEvents: ( state, { payload } ) => {
        state.events = payload;
      },

      setEvent: ( state, { payload } ) => {
        state.event = payload;
      },
      
      setPage: ( state, { payload } ) => {
        state.page = payload;
      },

      setTotal: ( state, { payload } ) => {
        state.total = payload;
      },

      setFilter: ( state, { payload } ) => {
        state.filter = payload;
      },
      
      setTotalPages: ( state, { payload }) => {
        state.totalPages = payload;
      }

    }
})

export const {  
  setPage,
  setEvents,
  setEvent,
  setTotal,
  setFilter,
  setTotalPages,
} = eventsSlice.actions;
