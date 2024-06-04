import { useState } from 'react';
import { useForm } from '../../../../../hooks';
import { useScanTicket } from '../../../../hooks/useScanTicket';

const formData = {
  adultsDiscount: undefined,
  kidsDiscount: undefined,
};

const formValidations = {
  adultsDiscount: [
    (value) => value !== undefined,
    'La cantidad de adultos es requerida',
  ],
  kidsDiscount: [
    (value) => value !== undefined,
    'La cantidad de niños es requerida',
  ],
};

export const ScanTicketForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    formState,
    onInputChange,
    onResetForm,
    adultsDiscount,
    kidsDiscount,
    adultsDiscountValid,
    kidsDiscountValid,
    isFormValid,
  } = useForm(formData, formValidations);
  const { updateTicketScanned, ticketScanned } = useScanTicket();

  const onUpdateQuantityTicket = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    updateTicketScanned(ticketScanned.id, formState);

    onResetForm();

    setFormSubmitted(false);
  };

  return (
    <div className="scanTicket-form">
      <header className="scanTicket-form__header">
        <h2 className="scanTicket-form__title">Registro de asistencia</h2>
      </header>
      <ul className="scanTicket-form__list">
        <li className="scanTicket-form__text">
          Coloca la cantidad de adultos y niños respetivamente que se están
          presentando en la entrada para actualizar el boleto.
        </li>
        <li className="scanTicket-form__text">
          Revisa que la cantidad de adultos y niños a ingresar sea menor que la
          cantidad especificada en el boleto.
        </li>
      </ul>
      <form onSubmit={onUpdateQuantityTicket} className="form">
        <div className="form__field">
          <label htmlFor="adultsDiscount" className="form__label">
            Cantidad de adultos
          </label>
          <input
            name="adultsDiscount"
            value={adultsDiscount}
            onChange={onInputChange}
            className="form__input"
            id="adultsDiscount"
            type="number"
            placeholder="Ingresa la cantidad de adultos a descontar del boleto"
          />
          <span
            className={`form__span ${
              !isFormValid && formSubmitted ? 'text-wrong' : null
            }`}
          >
            {adultsDiscountValid}
          </span>
        </div>
        <div className="form__field">
          <label htmlFor="kidsDiscount" className="form__label">
            Cantidad de niños
          </label>
          <input
            name="kidsDiscount"
            value={kidsDiscount}
            onChange={onInputChange}
            className="form__input"
            id="kidsDiscount"
            type="number"
            placeholder="Ingresa la cantidad de niños a descontar del boleto"
          />
          <span
            className={`form__span ${
              !isFormValid && formSubmitted ? 'text-wrong' : null
            }`}
          >
            {kidsDiscountValid}
          </span>
        </div>
        <div className="form__buttons">
          <button className="btn btn--black form__btn">
            Actualizar boleto
          </button>
        </div>
      </form>
    </div>
  );
};
