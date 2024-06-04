import { createSlice } from '@reduxjs/toolkit';

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    total: 0,
    totalAdults: 0,
    totalKids: 0,
    page: 1,
    totalPages: 0,
    tickets: [],
    ticketTarget: {},
  },
  reducers: {
    setTickets: (state, { payload }) => {
      state.tickets = payload;
    },

    setPage: (state, { payload }) => {
      state.page = payload;
    },

    setTotal: (state, { payload }) => {
      state.total = payload;
    },

    setTotalPages: (state, { payload }) => {
      state.totalPages = payload;
    },

    setTotalAdults: (state, { payload }) => {
      state.totalAdults = payload;
    },

    setTotalKids: (state, { payload }) => {
      state.totalKids = payload;
    },

    setTicketTarget: (state, { payload }) => {
      state.ticketTarget = payload;
    },
  },
});

export const {
  setTickets,
  setPage,
  setTotal,
  setTotalAdults,
  setTotalKids,
  setTotalPages,
  setTicketTarget,
} = ticketsSlice.actions;
