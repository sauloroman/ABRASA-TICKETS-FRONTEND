import { getEnvVariables } from '../../helpers';

const { VITE_GOOGLE_CLIENT_ID: clientId } = getEnvVariables(); 

export const createGoogleButton = ( callback ) => {
  google.accounts.id.initialize({
    client_id: clientId,
    callback: callback,
  });
  google.accounts.id.renderButton(
    document.getElementById('buttonDiv'),
    { 
      text: 'Iniciar sesión con Google',
      theme: 'outline', 
      size: 'large', 
      locale: 'es', 
      width: '250px' 
    }
  );
  google.accounts.id.prompt();
}