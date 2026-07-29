import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  EventConfirmationPage,
  EventPage,
  EventsPage,
  ProfilePage,
  ScanTicketPage,
  StadisticsPage,
} from '../pages';

export const AbrasaRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/auth')) {
      const lastPath = location.pathname + location.search;
      localStorage.setItem('lastPath', lastPath);
    }
  }, [location]);

  const storedPath = localStorage.getItem('lastPath');
  const lastPath = (storedPath && !storedPath.startsWith('/auth')) ? storedPath : '/';

  return (
    <Routes>
      <Route path="profile" element={<ProfilePage />} />
      <Route path="/" element={<EventsPage />} />
      <Route path="events/:id" element={<EventPage />} />
      <Route path="event-confirmations/:id" element={<EventConfirmationPage />} />
      <Route path="stadistics" element={<StadisticsPage />} />
      <Route path="scanTicket/:id" element={<ScanTicketPage />} />
      <Route path="/*" element={<Navigate to={lastPath} />} />
    </Routes>
  );
};
