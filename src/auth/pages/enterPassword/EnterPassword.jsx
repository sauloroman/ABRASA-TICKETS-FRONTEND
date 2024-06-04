import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LayoutUpdates } from '../../layout';
import { useForm } from '../../../hooks';
import { useAuthentication } from '../../hooks';

const formData = {
  newPassword: '',
}

const formValidations = {
  newPassword: [ (value) => value.length >= 8, 'Contraseña debe tener 8 caracteres' ],
}

export const EnterPassword = () => {

  const [ formSubmitted, setFormSubmitted ] = useState( false );
  const [ showPassword, setShowPassword ] = useState( false );
  const { token } = useParams();
  const { changePassword } = useAuthentication();

  const {
    newPassword, newPasswordValid,
    onInputChange, onResetForm, isFormValid
  } = useForm( formData, formValidations );

  const onChangePassword = ( e ) => {

    e.preventDefault();
    setFormSubmitted( true );

    if ( !isFormValid ) return;

    changePassword( newPassword, token );
    setFormSubmitted( false );
    onResetForm();
  }

  return (
    <LayoutUpdates
      title="Cambia tu contraseña"
      description="Ingresa tu nueva contraseña. Debe tener una longitud de 8 characteres."
    >
      <form onSubmit={ onChangePassword } className="form">
        <div className="form__field">
          <label htmlFor="password" className="form__label text-left">
            Ingresa la nueva contraseña
          </label>
          <div className="form__input form__input--password">
            <input
              value={newPassword}
              name="newPassword"
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
            {newPasswordValid}
          </span>
        </div>
        <div className="form__button">
            <button type="submit" className="btn btn--black">
              Cambiar
            </button>
            <div id="buttonDiv"></div>
          </div>
      </form>
    </LayoutUpdates>
  );
};
