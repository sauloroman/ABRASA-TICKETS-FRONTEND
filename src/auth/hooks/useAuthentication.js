import { useDispatch, useSelector } from "react-redux"
import { 
  startChangingPassword,
  startGoogleSingIn,
  startLoggingUser, 
  startRegisteringUser, 
  startRenewingToken, 
  startSendingEmail, 
  startValidatingEmail } from "../../store/auth/auth.thunks";
import { logout } from "../../store/auth/auth.slice";

export const useAuthentication = () => {

  const dispatch = useDispatch();
  const { user, status } = useSelector( store => store.auth );

  const registerUser = ( userInformation  = {} ) => {
    dispatch( startRegisteringUser( userInformation ) );
  }

  const loginUser = ( userCredentials = {} ) => {
    dispatch( startLoggingUser( userCredentials ) );
  }

  const sendCode = ( code, token ) => {
    dispatch( startValidatingEmail( code, token) );
  }

  const renewToken = () => {
    dispatch( startRenewingToken() );
  }

  const logoutUser = () => {
    localStorage.removeItem('user');
    dispatch( logout() );
  }

  const loginGoogle = ( response ) => {
    const body = { idToken: response.credential};
    dispatch( startGoogleSingIn( body ) );
  }

  const sendEmailToChangePassword = ( email = '' ) => {
    dispatch( startSendingEmail( email ) );
  }

  const changePassword = ( newPassword, tokenUser ) => {
    dispatch( startChangingPassword( newPassword, tokenUser ) );
  }

  return {
    user, 
    status,

    // METHODS
    loginUser,
    logoutUser,
    registerUser,
    sendCode,
    renewToken,
    loginGoogle,
    sendEmailToChangePassword,
    changePassword
  }

}