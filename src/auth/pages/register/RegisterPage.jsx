import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { useAuthentication } from '../../hooks';
import { LayoutCredentials } from '../../layout';

const formData = {
  name: '',
  email: '',
  password: '',
};

const emailRgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const formValidations = {
  name: [(value) => value.length >= 1, 'Nombre obligatorio'],
  email: [
    (value) => emailRgx.test(value) && value.length >= 1,
    'Ingrese correo valido',
  ],
  password: [
    (value) => value.length >= 8,
    'Contraseña debe tener 8 caracteres',
  ],
};

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    name,
    email,
    password,
    formState,
    nameValid,
    emailValid,
    passwordValid,
    isFormValid,
    onInputChange,
    onResetForm,
  } = useForm(formData, formValidations);
  const { registerUser } = useAuthentication();

  const onRegisterUser = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    registerUser(formState);
    onResetForm();
  };

  return (
    <LayoutCredentials
      titlePage="Dale orden a tu evento"
      descriptionPage="Con Abrasa Tickets no te encuentras con sorpresas en tu evento. Orden, calidad y sencillez. Todo en un solo lado. Comienza creando una cuenta."
      disclamerPage="Ya tienes una cuenta?"
      navigatePage="/auth/login"
      navigateTextPage="Ingresa a Abrasa"
    >
        <form onSubmit={onRegisterUser} className="form">
          <div className="form__field">
            <label htmlFor="text" className="form__label">
              Nombre Completo
            </label>
            <input
              name="name"
              value={name}
              onChange={onInputChange}
              autoComplete="off"
              placeholder="Registra tu nombre completo"
              type="text"
              id="text"
              className="form__input"
            />
            <span
              className={`form__span ${
                !isFormValid && formSubmitted ? 'text-wrong' : null
              }`}
            >
              {nameValid}
            </span>
          </div>
          <div className="form__field">
            <label htmlFor="email" className="form__label">
              Correo electrónico
            </label>
            <input
              name="email"
              value={email}
              onChange={onInputChange}
              autoComplete="off"
              placeholder="Registra tu correo"
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
                name="password"
                value={password}
                onChange={onInputChange}
                placeholder="Crea una contraseña"
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
          <div className="form__button">
            <button className="btn btn--black">Crear cuenta</button>
          </div>
        </form>
    </LayoutCredentials>
  );
};
