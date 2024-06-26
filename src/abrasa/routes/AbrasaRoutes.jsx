import { Navigate, Route, Routes } from 'react-router-dom';
import {
  EventPage,
  EventsPage,
  ProfilePage,
  ScanTicketPage,
  StadisticsPage,
} from '../pages';

export const AbrasaRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<ProfilePage />} />
      <Route path="/" element={<EventsPage />} />
      <Route path="events/:id" element={<EventPage />} />
      <Route path="stadistics" element={<StadisticsPage />} />
      <Route path="scanTicket/:id" element={<ScanTicketPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
