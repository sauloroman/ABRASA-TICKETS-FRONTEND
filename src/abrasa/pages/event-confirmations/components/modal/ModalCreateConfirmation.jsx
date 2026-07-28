import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, useUI } from '../../../../../hooks';
import { useConfirmations } from '../../../../hooks';
import { LayoutModal } from '../../../../layout/modal/LayoutModal';

const formData = {
  firstName: '',
  lastName: '',
  phone: '',
  adultsQuantity: 1,
  kidsQuantity: 0,
};

const formValidations = {
  firstName: [(value) => value.length > 0, 'El nombre es obligatorio'],
  lastName: [(value) => value.length > 0, 'El apellido es obligatorio'],
  phone: [(value) => value.length > 0 && value.length < 15, 'Número de teléfono no válido'],
  adultsQuantity: [(value) => Number(value) >= 0, 'Cantidad no válida'],
  kidsQuantity: [(value) => Number(value) >= 0 || !value, 'Cantidad no válida'],
};

export const ModalCreateConfirmation = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { id } = useParams();
  const { createConfirmation } = useConfirmations();
  const { closeModal } = useUI();

  const {
    firstName,
    lastName,
    phone,
    adultsQuantity,
    kidsQuantity,
    onInputChange,
    onResetForm,
    formState,
    firstNameValid,
    lastNameValid,
    phoneValid,
    adultsQuantityValid,
    kidsQuantityValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const onCreateConfirmation = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    createConfirmation(
      {
        ...formState,
        event: id,
        adultsQuantity: Number(adultsQuantity),
        kidsQuantity: Number(kidsQuantity),
      },
      { eventId: id, page: 1, limit: 30 }
    );

    closeModal('confirmationsPageModal');
    setFormSubmitted(false);
    onResetForm();
  };

  return (
    <LayoutModal title="Registrar Confirmación" modalName="confirmationsPageModal">
      <form onSubmit={onCreateConfirmation} className="form">
        <div className="form__field">
          <label className="form__label">Nombre</label>
          <input
            name="firstName"
            value={firstName}
            onChange={onInputChange}
            className="form__input"
            placeholder="Ingresa el nombre"
            type="text"
          />
          <span className={`form__span ${!isFormValid && formSubmitted && firstNameValid ? 'text-wrong' : ''}`}>
            {firstNameValid}
          </span>
        </div>

        <div className="form__field">
          <label className="form__label">Apellido</label>
          <input
            name="lastName"
            value={lastName}
            onChange={onInputChange}
            className="form__input"
            placeholder="Ingresa el apellido"
            type="text"
          />
          <span className={`form__span ${!isFormValid && formSubmitted && lastNameValid ? 'text-wrong' : ''}`}>
            {lastNameValid}
          </span>
        </div>

        <div className="form__field">
          <label className="form__label">Número de teléfono</label>
          <input
            name="phone"
            value={phone}
            onChange={onInputChange}
            className="form__input"
            placeholder="Ingresa el número de teléfono"
            type="text"
          />
          <span className={`form__span ${!isFormValid && formSubmitted && phoneValid ? 'text-wrong' : ''}`}>
            {phoneValid}
          </span>
        </div>

        <div className="form__field">
          <label className="form__label">Pases para adulto</label>
          <input
            name="adultsQuantity"
            value={adultsQuantity}
            onChange={onInputChange}
            className="form__input"
            placeholder="Cantidad de adultos"
            type="number"
            min={0}
          />
          <span className={`form__span ${!isFormValid && formSubmitted && adultsQuantityValid ? 'text-wrong' : ''}`}>
            {adultsQuantityValid}
          </span>
        </div>

        <div className="form__field">
          <label className="form__label">Pases para niño</label>
          <input
            name="kidsQuantity"
            value={kidsQuantity}
            onChange={onInputChange}
            className="form__input"
            placeholder="Cantidad de niños"
            type="number"
            min={0}
          />
          <span className={`form__span ${!isFormValid && formSubmitted && kidsQuantityValid ? 'text-wrong' : ''}`}>
            {kidsQuantityValid}
          </span>
        </div>

        <div className="form__buttons">
          <button className="btn btn--black">Registrar Confirmación</button>
        </div>
      </form>
    </LayoutModal>
  );
};
