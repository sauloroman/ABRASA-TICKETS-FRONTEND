import { createSlice } from '@reduxjs/toolkit';

export const confirmationsSlice = createSlice({
  name: 'confirmations',
  initialState: {
    confirmations: [],
    page: 1,
    limit: 30,
    total: 0,
    totalPages: 1,
    totalAdults: 0,
    totalKids: 0,
    totalPeople: 0,
    isLoading: false,
    isExportingPdf: false,
  },
  reducers: {
    setConfirmations: (state, action) => {
      state.confirmations = action.payload || [];
    },
    setStats: (state, action) => {
      const { totalRegistros = 0, totalAdults = 0, totalKids = 0, totalPeople = 0 } = action.payload || {};
      state.totalAdults = totalAdults;
      state.totalKids = totalKids;
      state.totalPeople = totalPeople;
      state.total = totalRegistros;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setIsLoadingConfirmations: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsExportingPdf: (state, action) => {
      state.isExportingPdf = action.payload;
    },
  },
});

export const {
  setConfirmations,
  setStats,
  setPage,
  setTotal,
  setTotalPages,
  setIsLoadingConfirmations,
  setIsExportingPdf,
} = confirmationsSlice.actions;
