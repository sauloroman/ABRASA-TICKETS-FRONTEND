import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui/ui.slice';
import { authSlice } from './auth/auth.slice';
import { profileSlice } from './abrasa/profile/profile.slice';
import { eventsSlice } from './abrasa/events/events.slice';
import { ticketsSlice } from './abrasa/tickets/tickets.slice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    events: eventsSlice.reducer,
    tickets: ticketsSlice.reducer,
  },
});
