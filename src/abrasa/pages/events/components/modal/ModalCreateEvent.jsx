import { useState } from "react";
import { useForm, useUI } from "../../../../../hooks"
import { useEvents } from "../../../../hooks/useEvents";
import { useAuthentication } from "../../../../../auth/hooks";

const formData = {
  name: '',
  client: '',
  eventType: '',
  eventDate: '',
}

const validEventTypes = ['graduación', 'posada', 'xv', 'boda'];

const formValidations = {
  name: [ value => value.length > 0 && value.length < 100, 'El nombre es obligatorio y menor a 100 caracteres' ],
  client: [ value => value.length > 0 && value.length < 100, 'El cliente es obligatorio y menor a 100 caracteres' ],
  eventType: [ value => validEventTypes.includes( value ), 'No es un tipo válido' ],
  eventDate: [ value => value.length > 0, 'La fecha es obligatoria' ],
}

export const ModalCreateEvent = () => {

  const [formSubmitted, setformSubmitted] = useState(false);
  const { createEvent, filter } = useEvents();
  const {
    name, client, eventDate, eventType, formState,
    nameValid, clientValid, eventDateValid, eventTypeValid, 
    isFormValid, onInputChange, onResetForm
  } = useForm( {...formData, eventType: filter }, formValidations );


  const { closeModal } = useUI();

  const { user } = useAuthentication();

  const onCreateEvent = ( e ) => {

    e.preventDefault();
    setformSubmitted( true );

    if ( !isFormValid ) return;

    createEvent( 
      formState, 
      { userID: user.id, page: 1, limit: 6, category: filter } 
    );

    setformSubmitted( false );
    closeModal('eventsPageModal');
    onResetForm();

  }

  return (
    <form onSubmit={ onCreateEvent } className="form">
      <div className="form__field">
        <label htmlFor="event-name" className="form__label">Nombre del evento</label>
        <input 
          id="event-name"
          type="text" 
          name="name"
          className="form__input"
          placeholder="Ingresa el nombre del evento"
          value={ name }
          onChange={ onInputChange }
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
        <label htmlFor="client" className="form__label">Nombre del cliente</label>
        <input 
          id="client"
          type="text" 
          name="client"
          className="form__input"
          placeholder="Ingresa el nombre del cliente"
          value={ client }
          onChange={ onInputChange }
        />
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {clientValid}
        </span>
      </div>
      <div className="form__field">
        <label htmlFor="event-type" className="form__label">Tipo de evento</label>
        <select 
          name="eventType" 
          value={ eventType } 
          onChange={ onInputChange } 
          className="form__input" 
          id="event-type"
        >
          <option value=""></option>
          <option value="graduación">Graduación</option>
          <option value="posada">Posada</option>
          <option value="xv">XV años</option>
          <option value="boda">Bodas</option>
        </select>
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {eventTypeValid}
        </span>
      </div>
      <div className="form__field">
        <label htmlFor="event-type" className="form__label">Fecha del evento</label>
        <input 
          className="form__input"
          type="date" 
          name="eventDate"
          value={ eventDate }
          onChange={onInputChange}
        />
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {eventDateValid}
        </span>
      </div>
      <button className="form__button btn btn--black">Crear Evento</button>
    </form>
  )
}
