import { useState } from "react";
import { useForm, useUI } from "../../../../../hooks"
import { useEvents, useTickets } from "../../../../hooks";

const formValidations = {
  newName: [ value => value.length > 0, 'El nombre es obligatorio'],
  newPhone: [ value => value.length > 0 && value.length < 11, 'Numero de teléfono no válido'],
  newAdultsQuantity: [ value => value >= 0, 'No es cantidad valida'] ,
  newKidsQuantity: [ value => value >= 0, 'No es cantidad valida'] ,
  newKeyPass: [ value => value.length >= 4, 'La clave debe de ser mínimo 4 letras'],
  newTable: [ value => value >= "", 'El numero de mesa no es valido'],
}

export const ModalUpdateTicket = () => {

  const [ formSubmitted, setFormSubmitted ] = useState( false );
  const { eventPageModal: { data }, closeModal } = useUI();
  const { event: { id } } = useEvents();
  const { updateTicket } = useTickets();

  const {
    newName, newPhone, newAdultsQuantity, newKidsQuantity, newKeyPass, newTable, formState,
    newNameValid, newPhoneValid, newAdultsQuantityValid, newKidsQuantityValid, newTableValid, newKeyPassValid,
    onInputChange, onResetForm, isFormValid
  } = useForm({
    newName: data.name,
    newPhone: data.phone,
    newAdultsQuantity: data.adultsQuantity,
    newKidsQuantity: data.kidsQuantity,
    newKeyPass: data.keyPass,
    newTable: data.table,
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
      {...formData},
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
          placeholder="Ingrese el nuevo número de teléfono"
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
          placeholder="Ingrese la nueva cantidad de adultos"
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
          placeholder="Ingrese la nueva cantidad de infantes"
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
      <div className="form__field">
        <label 
          htmlFor="" 
          className="form__label">Nuevo número de mesa</label>
        <input 
          placeholder="Ingrese el nuevo numero de mesa"
          name="newTable"
          value={ newTable }
          onChange={ onInputChange }
          type="text" 
          className="form__input" 
        />
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {newTableValid}
        </span>
      </div>
      <div className="form__field">
        <label 
          htmlFor="" 
          className="form__label">Nueva clave</label>
        <input 
          placeholder="Ingrese la nueva clave"
          name="newKeyPass"
          value={ newKeyPass }
          onChange={ onInputChange }
          type="text" 
          className="form__input" 
        />
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {newKeyPassValid}
        </span>
      </div>
      <div className="form__button">
        <button className="btn btn--black">Actualizar Boleto</button>
      </div>
    </form>
  )
}
