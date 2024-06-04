import { useState } from "react";
import { useForm, useUI } from "../../../../../hooks"
import { useEvents, useTickets } from "../../../../hooks";

const formValidations = {
  newName: [ value => value.length > 0, 'El nombre es obligatorio'],
  newPhone: [ value => value.length > 0 && value.length < 11, 'Numero de teléfono no válido'],
  newAdultsQuantity: [ value => value >= 0, 'No es cantidad valida'] ,
  newKidsQuantity: [ value => value >= 0, 'No es cantidad valida'] ,
}

export const ModalUpdateTicket = () => {

  const [ formSubmitted, setFormSubmitted ] = useState( false );
  const { eventPageModal: { data }, closeModal } = useUI();
  const { event: { id } } = useEvents();
  const { updateTicket } = useTickets();

  const {
    newName, newPhone, newAdultsQuantity, newKidsQuantity, formState,
    newNameValid, newPhoneValid, newAdultsQuantityValid, newKidsQuantityValid,
    onInputChange, onResetForm, isFormValid
  } = useForm({
    newName: data.name,
    newPhone: data.phone,
    newAdultsQuantity: data.adultsQuantity,
    newKidsQuantity: data.kidsQuantity,
  }, formValidations );

  const onUpdateTicket = ( e ) => {

    e.preventDefault();
    setFormSubmitted( true );

    if ( !isFormValid ) return;

    const formData = {};

    for ( const field of Object.keys( formState ) ) {
      const nameField = field.split('new')[1];
      const nameFieldFormatted = nameField.slice(0, 1).toLowerCase() + nameField.slice(1, nameField.length)
      formData[ nameFieldFormatted ] = formState[field];
    }

    updateTicket(
      data.id,
      {...formData, adultsQuantity: Number(formData.adultsQuantity) + 1},
      { eventID: id, page: 1, limit: 15 }
    );

    setFormSubmitted( false );
    onResetForm();
    closeModal('eventPageModal');

  }

  return (
    <form onSubmit={ onUpdateTicket } className="form">
      <div className="form__field">
        <label 
          htmlFor="" 
          className="form__label">Nombre del boleto</label>
        <input 
          placeholder="Ingrese el nuevo nombre"
          name="newName"
          value={ newName }
          onChange={ onInputChange }
          type="text" 
          className="form__input" 
        />
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {newNameValid}
        </span>
      </div>
      <div className="form__field">
        <label 
          htmlFor="" 
          className="form__label">Número del boleto</label>
        <input 
          placeholder="Ingrese el nuevo nombre"
          name="newPhone"
          value={ newPhone }
          onChange={ onInputChange }
          type="text" 
          className="form__input" 
        />
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {newPhoneValid}
        </span>
      </div>
      <div className="form__field">
        <label 
          htmlFor="" 
          className="form__label">Nueva cantidad de adultos</label>
        <input 
          placeholder="Ingrese el nuevo nombre"
          name="newAdultsQuantity"
          value={ newAdultsQuantity }
          onChange={ onInputChange }
          type="number"
          min={1} 
          className="form__input" 
        />
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {newAdultsQuantityValid}
        </span>
      </div>
      <div className="form__field">
        <label 
          htmlFor="" 
          className="form__label">Nueva cantidad de niños</label>
        <input 
          placeholder="Ingrese el nuevo nombre"
          name="newKidsQuantity"
          value={ newKidsQuantity }
          onChange={ onInputChange }
          type="text" 
          className="form__input" 
        />
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {newKidsQuantityValid}
        </span>
      </div>
      <div className="form__button">
        <button className="btn btn--black">Actualizar Boleto</button>
      </div>
    </form>
  )
}
