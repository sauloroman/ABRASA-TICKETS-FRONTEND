import abrasaApi from '../../config/api/abrasaApi';
import { setAlert, setIsLoading } from '../ui/ui.slice';
import { login, logout } from './auth.slice';

export const startRegisteringUser = (userInformation = {}) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await abrasaApi.post('/auth/register', userInformation);
      const { user } = data;

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: `Bievenido ${
            user.name.split(' ')[0]
          }. Hemos mandado un correo a ${
            user.email
          }. Para poder iniciar sesión debes validar tu correo.`,
          type: 'success',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data.error;

      dispatch(logout());

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: errorMessage,
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startLoggingUser = (userCredentials = {}) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await abrasaApi.post('/auth/login', userCredentials);
      const { user, token } = data;

      dispatch(login({ user }));
      localStorage.setItem('user', JSON.stringify(token));

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: `Bievenido de vuelta ${
            user.name.split(' ')[0]
          }. Exito trabajando en tus eventos.`,
          type: 'success',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data.error;

      dispatch(logout());

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: errorMessage,
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startGoogleSingIn = (body) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await abrasaApi.post('/auth/google', body);
      const { user, token } = data;

      dispatch(login({ user }));
      localStorage.setItem('user', JSON.stringify(token));

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: `Bievenido de vuelta ${
            user.name.split(' ')[0]
          }. Exito trabajando en tus eventos.`,
          type: 'success',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data.error;

      dispatch(logout());

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: errorMessage,
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startRenewingToken = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await abrasaApi.get('/auth/renew-token');
      const { token, user } = data;

      dispatch(login({ user }));
      localStorage.setItem('user', JSON.stringify(token));
    } catch (error) {
      console.log(error);
      dispatch(logout());
    }

    dispatch(setIsLoading(false));
  };
};

export const startValidatingEmail = (code = '00000', tokenEmail = '') => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await abrasaApi.put(
        `/auth/validate-email/${tokenEmail}`,
        { code }
      );
      const { token, user } = data;

      dispatch(login({ user }));
      localStorage.setItem('user', JSON.stringify(token));

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: `El correo ${user.email} ha sido validado`,
          type: 'success',
          link: {
            isLink: true,
            path: '/',
          },
        })
      );
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data.error;

      dispatch(logout());

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: errorMessage,
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startSendingEmail = (email = '') => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await abrasaApi.post('/auth/change-password-email', {
        email,
      });
      const { msg } = data;

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: msg,
          type: 'success',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data.error;

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: errorMessage,
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startChangingPassword = (newPassword = '', tokenUser = '') => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await abrasaApi.put(
        `/auth/change-password/${tokenUser}`,
        { newPassword }
      );

      const { msg } = data;

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: msg,
          type: 'success',
          link: {
            isLink: true,
            path: '/auth/login',
          },
        })
      );
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data.error;

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: errorMessage,
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};
