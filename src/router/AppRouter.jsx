import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AbrasaRoutes } from '../abrasa/routes/AbrasaRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthentication } from '../auth/hooks';

export const AppRouter = () => {
  
  const { status, renewToken } = useAuthentication();

  useEffect(() => {
    renewToken();
  }, []);

  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path="/*" element={<AbrasaRoutes />} />
      ) : (
        <Route path="auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
