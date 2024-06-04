import { useState } from 'react';
import { useForm } from '../../../hooks';
import { useAuthentication } from '../../hooks';
import { LayoutCredentials } from '../../layout'

const formData = {
  email: '',
}

const emailRgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const formValidations = {
  email: [
    (value) => value.length >= 1 && emailRgx.test(value),
    'Correo valido necesario',
  ],
};

export const EnterEmailPage = () => {

  const [ formSubmitted, setFormSubmitted ] = useState( false );
  const { email, onInputChange, onResetForm, emailValid, isFormValid } = useForm( formData, formValidations );
  const { sendEmailToChangePassword } = useAuthentication();

  const onSendEmail = ( e ) => {
    e.preventDefault();
    setFormSubmitted( true );

    if ( !isFormValid ) return;

    sendEmailToChangePassword( email );
    setFormSubmitted( false );
    onResetForm();
  }

  return (
    <LayoutCredentials
      titlePage="Ingresa tu correo"
      descriptionPage="Para poder cambiar tu contraseña primero ingresa tu correo. Te enviaremos las instrucciones a tu correo para cambiarla."
      disclamerPage="Ya tienes una cuenta?"
      navigatePage="/auth/login"
      navigateTextPage="Ingresar"
    >
      <form onSubmit={ onSendEmail } className="form">
        <div className="form__field">
          <label htmlFor="email" className="form__label">
            Correo electrónico
          </label>
          <input
            value={email}
            name="email"
            onChange={onInputChange}
            autoComplete="off"
            placeholder="Ingresa tu correo"
            type="email"
            id="email"
            className="form__input"
          />
          <span
            className={`form__span ${
              !isFormValid && formSubmitted ? 'text-wrong' : null
            }`}
          >
            {emailValid}
          </span>
        </div>
        <div className="form__button">
            <button type="submit" className="btn btn--black">
              Enviar correo
            </button>
          </div>
      </form>
    </LayoutCredentials>
  );
};
