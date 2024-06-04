import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthentication } from '../../hooks';
import { useForm } from '../../../hooks';
import { LayoutUpdates } from '../../layout';

const formData = {
  digit1: '',
  digit2: '',
  digit3: '',
  digit4: '',
  digit5: '',
};

const formValidations = {
  digit1: [(value) => value >= 0 && value <= 9, 'No valido'],
  digit2: [(value) => value >= 0 && value <= 9, 'No valido'],
  digit3: [(value) => value >= 0 && value <= 9, 'No valido'],
  digit4: [(value) => value >= 0 && value <= 9, 'No valido'],
  digit5: [(value) => value >= 0 && value <= 9, 'No valido'],
};

export const ConfirmPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email = 'correo@correo.com', token } = useParams();
  const { sendCode } = useAuthentication();

  const {
    digit1,
    digit2,
    digit3,
    digit4,
    digit5,
    isFormValid,
    formState,
    onInputChange,
    onResetForm,
  } = useForm(formData, formValidations);

  const onSendCode = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    let codeString = '';

    for (const digit of Object.values(formState)) {
      codeString += digit;
    }

    sendCode(codeString, token);

    setFormSubmitted(false);
    onResetForm();
  };

  return (
    <LayoutUpdates
      title = 'Codigo de confirmación'
      description = {`Ingresa el codigo de 5 dígitos que mandamos al correo ${email}`}
    >
      <form onSubmit={onSendCode} className="confirm-page__form">
        <div className="confirm-page__grid">
          <input
            name="digit1"
            value={digit1}
            onChange={onInputChange}
            type="number"
            placeholder="0"
            min="0"
            max="9"
            aria-controls="off"
            className={`confirm-page__box ${
              formSubmitted && isFormValid ? 'border-wrong' : null
            }`}
          ></input>
          <input
            name="digit2"
            value={digit2}
            onChange={onInputChange}
            type="number"
            placeholder="0"
            min="0"
            max="9"
            aria-controls="off"
            className={`confirm-page__box ${
              formSubmitted && isFormValid ? 'border-wrong' : null
            }`}
          ></input>
          <input
            name="digit3"
            value={digit3}
            onChange={onInputChange}
            type="number"
            placeholder="0"
            min="0"
            max="9"
            aria-controls="off"
            className={`confirm-page__box ${
              formSubmitted && isFormValid ? 'border-wrong' : null
            }`}
          ></input>
          <input
            name="digit4"
            value={digit4}
            onChange={onInputChange}
            type="number"
            placeholder="0"
            min="0"
            max="9"
            aria-controls="off"
            className={`confirm-page__box ${
              formSubmitted && isFormValid ? 'border-wrong' : null
            }`}
          ></input>
          <input
            name="digit5"
            value={digit5}
            onChange={onInputChange}
            type="number"
            placeholder="0"
            min="0"
            max="9"
            aria-controls="off"
            className={`confirm-page__box ${
              formSubmitted && isFormValid ? 'border-wrong' : null
            }`}
          ></input>
        </div>
        <button className="btn btn--black confirm-page__button">
          Enviar código
        </button>
      </form>
    </LayoutUpdates>
  );
};
