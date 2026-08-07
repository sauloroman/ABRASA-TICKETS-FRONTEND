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

    const success = updateTicketScanned(ticketScanned.id, formState);

    if (success) {
      const channel = new BroadcastChannel('abrasa_welcome_projection')
      channel.postMessage({ action: 'reset' })
      channel.close()
    }

    onResetForm();
    setFormSubmitted(false);
  };

  return (
    <div className="scanTicket-form">
      <header className="scanTicket-form__header">
        <h2 className="scanTicket-form__title">Registro de asistencia</h2>
      </header>
      <form onSubmit={onUpdateQuantityTicket} className="form">
        <div className="scanTicket-form__fields">
          <div className="form__field">
            <label htmlFor="adultsDiscount" className="form__label">
              Adultos
            </label>
            <input
              name="adultsDiscount"
              value={adultsDiscount}
              onChange={onInputChange}
              className="form__input"
              id="adultsDiscount"
              type="number"
              placeholder="0"
            />
            <span
              className={`form__span ${!isFormValid && formSubmitted ? 'text-wrong' : null
                }`}
            >
              {adultsDiscountValid}
            </span>
          </div>
          <div className="form__field">
            <label htmlFor="kidsDiscount" className="form__label">
              Niños
            </label>
            <input
              name="kidsDiscount"
              value={kidsDiscount}
              onChange={onInputChange}
              className="form__input"
              id="kidsDiscount"
              type="number"
              placeholder="0"
            />
            <span
              className={`form__span ${!isFormValid && formSubmitted ? 'text-wrong' : null
                }`}
            >
              {kidsDiscountValid}
            </span>
          </div>
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
