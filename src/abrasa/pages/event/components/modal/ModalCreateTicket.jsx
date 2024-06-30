import { useState } from "react"
import { useForm, useUI } from "../../../../../hooks"
import { useEvents, useTickets } from "../../../../hooks"

const formData = {
  name: '',
  phone: '',
  adultsQuantity: 0,
  kidsQuantity: 0,
  table: 0,
}

const formValidations = {
  name: [ value => value.length > 0, 'El nombre es obligatorio'] ,
  phone: [ value => value.length > 0 && value.length < 11, 'Numero de teléfono no válido'],
  adultsQuantity: [ value => value >= 1, 'No es cantidad valida'] ,
  kidsQuantity: [ value => value >= 0 || !value, 'No es cantidad valida'],
  table: [ value => value >= 0, 'No es una mesa valida' ]
}

export const ModalCreateTicket = () => {

  const [ formSubmitted, setFormSubmitted ] = useState( false );
  const { createTicket } = useTickets();
  const { event: { id } } = useEvents();
  const { closeModal } = useUI();

  const {
    name, phone, adultsQuantity, kidsQuantity, table, onInputChange, onResetForm, formState,
    nameValid, phoneValid, adultsQuantityValid, kidsQuantityValid, tableValid, isFormValid
  } = useForm( formData, formValidations );
  

  const onCreateTicket = ( e ) => {
    
    e.preventDefault()
    setFormSubmitted( true );
    
    if ( !isFormValid ) return;

    createTicket( 
      { ...formState, event: id },
      { eventID: id, page: 1, limit: 15 }
    );
    
    closeModal('eventPageModal');

    setFormSubmitted( false );
    onResetForm();

  }

  return (
    <form onSubmit={ onCreateTicket } className="form">
      <div className="form__field">
        <label htmlFor="" className="form__label">Nombre a quien corresponde el boleto</label>
        <input  
          name="name"
          value={ name }
          onChange={ onInputChange }
          className="form__input"
          placeholder="Ingresa el nombre de la persona"
          type="text" 
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
        <label htmlFor="" className="form__label">Número de teléfono</label>
        <input  
          name="phone"
          value={ phone }
          onChange={ onInputChange }
          className="form__input"
          placeholder="Ingresa el número de la persona para enviarlo"
          type="text" 
        />
         <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {phoneValid}
        </span>
      </div>
      <div className="form__field">
        <label htmlFor="" className="form__label">Cantidad de pases para adulto</label>
        <input  
          name="adultsQuantity"
          value={ adultsQuantity }
          onChange={ onInputChange }
          className="form__input"
          placeholder="Ingresa la cantidad de adultos para el boleto"
          type="number"
          min={0} 
        />
         <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {adultsQuantityValid}
        </span>
      </div>
      <div className="form__field">
        <label htmlFor="" className="form__label">Cantidad de pases para niño</label>
        <input  
          name="kidsQuantity"
          value={ kidsQuantity }
          onChange={ onInputChange }
          className="form__input"
          placeholder="Ingresa la cantidad de niños para el boleto"
          type="number"
          min={0} 
        />
         <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {kidsQuantityValid}
        </span>
      </div>
      <div className="form__field">
        <label htmlFor="" className="form__label">Número de mesa (puedes asignarlo después)</label>
        <input  
          name="table"
          value={ table }
          onChange={ onInputChange }
          className="form__input"
          placeholder="Ingresa el número de mesa"
          type="number"
          min={0} 
        />
         <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {tableValid}
        </span>
      </div>
      <div className="form__buttons">
        <button className="btn btn--black">Crear Boleto</button>
      </div>
    </form>
  )
}
