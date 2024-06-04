import { Navigate, Route, Routes } from "react-router-dom"
import { ConfirmPage, EnterEmailPage, EnterPassword, LoginPage, RegisterPage } from "../pages"

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={ <LoginPage /> } />
      <Route path="register" element={ <RegisterPage /> } />
      <Route path="password/enter-email" element={ <EnterEmailPage /> } />
      <Route path="password/new-password/:token" element={ <EnterPassword /> } />
      <Route path="confirm/:token/:email" element={ <ConfirmPage /> } />
      <Route path="/*" element={<Navigate to='/auth/login' />}/>
    </Routes>
  )
}
