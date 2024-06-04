import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createGoogleButton } from '../../helpers/';
import { useForm } from '../../../hooks/useForm';
import { useAuthentication } from '../../hooks';
import { LayoutCredentials } from '../../layout';

const formData = {
  email: '',
  password: '',
};

const emailRgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const formValidations = {
  email: [
    (value) => value.length >= 1 && emailRgx.test(value),
    'Correo valido necesario',
  ],
  password: [(value) => value.length >= 1, 'Contraseña necesaria'],
};

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    email,
    password,
    formState,
    emailValid,
    passwordValid,
    isFormValid,
    onInputChange,
    onResetForm,
  } = useForm(formData, formValidations);
  const { loginUser, loginGoogle } = useAuthentication();

  const onLoginUser = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    loginUser(formState);
    setFormSubmitted(false);
    onResetForm();
  };

  useEffect(() => {
    createGoogleButton(loginGoogle);
  }, []);

  return (
    <LayoutCredentials
      titlePage="Bienvenido de vuelta"
      descriptionPage="El software para la gestión de boletos electrónicos que tu evento social necesitaba. Inicia sesión y dale seguimiento a tus invitados."
      disclamerPage="No tienes una cuenta?"
      navigatePage="/auth/register"
      navigateTextPage="Crea una"
    >
        <form onSubmit={onLoginUser} className="form">
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
          <div className="form__field">
            <label htmlFor="password" className="form__label">
              Contraseña de acceso
            </label>
            <div className="form__input form__input--password">
              <input
                value={password}
                name="password"
                onChange={onInputChange}
                placeholder="Ingresa tu contraseña"
                type={showPassword ? 'password' : 'text'}
                id="password"
              />
              <i
                onClick={() => setShowPassword(!showPassword)}
                className={`bx bx-show form__icon ${
                  showPassword ? 'show-element' : 'hide-element'
                }`}
              ></i>
              <i
                onClick={() => setShowPassword(!showPassword)}
                className={`bx bx-hide form__icon ${
                  !showPassword ? 'show-element' : 'hide-element'
                }`}
              ></i>
            </div>
            <span
              className={`form__span ${
                !isFormValid && formSubmitted ? 'text-wrong' : null
              }`}
            >
              {passwordValid}
            </span>
          </div>
          <div className="form__forgot">
            <Link to="/auth/password/enter-email" className="form__forgot-text text-important">
              Olvidé mi contraseña
            </Link>
          </div>
          <div className="form__button">
            <button type="submit" className="btn btn--black">
              Ingresar
            </button>
            <div id="buttonDiv"></div>
          </div>
        </form>
    </LayoutCredentials>
  );
};
