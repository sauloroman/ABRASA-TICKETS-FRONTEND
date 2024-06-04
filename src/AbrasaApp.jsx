import { BrowserRouter } from "react-router-dom";
import { Alert } from "./components";
import { useUI } from "./hooks"
import { AppRouter } from "./router/AppRouter"

export const AbrasaApp = () => {

  const { alert: { isAlertOpen } } = useUI();

  return (
    <BrowserRouter>
      <AppRouter />
      { isAlertOpen && <Alert />}
    </BrowserRouter>
  )
}
