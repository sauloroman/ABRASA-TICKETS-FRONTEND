import { useState, useEffect } from "react";
import { useForm } from "../../../../../hooks/useForm";
import { useEvents } from "../../../../hooks/useEvents";
import { useUI } from "../../../../../hooks";
import { useAuthentication } from "../../../../../auth/hooks";
import abrasaApi from "../../../../../config/api/abrasaApi";

const formValidations = {
  newDescription: [ value => value.length < 200, 'La descripción debe ser menor a 200 caracteres' ],
  newEventType: [ value => ['graduación', 'posada', 'xv', 'boda'].includes( value ), 'Tipo de evento no valido' ],
}

export const ModalUpdateEvent = () => {
  const [ formSubmitted, setFormSubmitted ] = useState(false);
  const [ users, setUsers ] = useState([]);

  const { event: { id, name, eventType, eventDate, client, description, invitation, createdBy }, updateEvent } = useEvents();
  const { user: authUser } = useAuthentication();
  const { closeModal } = useUI();
  
  const {
    newName, newEventDate, newEventType, newClient, newInvitation, newDescription, newCreatedBy,
    formState, newEventTypeValid, newDescriptionValid,
    isFormValid, onInputChange, onResetForm
  } = useForm( {
    newName: name , 
    newEventType: eventType,
    newEventDate: eventDate,
    newClient: client, 
    newDescription: description,
    newInvitation: invitation,
    newCreatedBy: createdBy || '',
  }, formValidations ); 

  useEffect(() => {
    if (authUser?.role === 'Admin') {
      abrasaApi.get('/auth/users')
        .then(({ data }) => setUsers(data || []))
        .catch(err => console.log('Error loading users:', err));
    }
  }, [authUser]);

  const onUpdateEvent = ( e ) => {
    e.preventDefault();
    setFormSubmitted( true );
    
    if ( !isFormValid ) return;

    const formData = {};

    for ( const field of Object.keys( formState ) ) {
      const nameField = field.split('new')[1];
      const nameFieldFormatted = nameField.slice(0, 1).toLowerCase() + nameField.slice(1, nameField.length)
      formData[ nameFieldFormatted ] = formState[field];
    }

    updateEvent( id, formData );
    closeModal('eventPageModal');

    setFormSubmitted( false );
    onResetForm();
  }
    
  return (
    <form onSubmit={ onUpdateEvent } className="form">
      <div className="form__field">
        <label className="form__label">Nuevo nombre</label>
        <input 
          placeholder="Ingresa nuevo nombre"
          className="form__input"
          name='newName'
          value={newName}
          onChange={ onInputChange }
          type="text" 
        />
      </div>
      <div className="form__field">
        <label className="form__label">Nueva descripción</label>
        <textarea 
          placeholder="Ingresa nueva descripción"
          className="form__input form__textarea"
          name='newDescription'
          value={newDescription}
          onChange={ onInputChange }
          type="text" 
        ></textarea>
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {newDescriptionValid}
        </span>
      </div>
      <div className="form__field">
        <label className="form__label">Nuevo tipo de evento</label>
        <select 
          className="form__input"
          name="newEventType" 
          value={ newEventType } 
          onChange={ onInputChange }
        >
          <option value="" selected>&mdash;</option>
          <option value="graduación">Graduación</option>
          <option value="posada">Posada</option>
          <option value="xv">XV años</option>
          <option value="boda">Boda</option>
        </select>
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {newEventTypeValid}
        </span>
      </div>
      <div className="form__field">
        <label className="form__label">Nuevo cliente</label>
        <input 
          placeholder="Ingresa nuevo cliente"
          className="form__input"
          name='newClient'
          value={newClient}
          onChange={ onInputChange }
          type="text" 
        />
      </div>
      <div className="form__field">
        <label className="form__label">Nueva invitación</label>
        <input 
          placeholder="Ingresa el url de la invitación"
          className="form__input"
          name='newInvitation'
          value={newInvitation}
          onChange={ onInputChange }
          type="text" 
        />
      </div>
      <div className="form__field">
        <label className="form__label">Nueva fecha</label>
        <input 
          placeholder="Ingresa nueva fecha"
          className="form__input"
          name='newEventDate'
          value={newEventDate}
          onChange={ onInputChange }
          type="date" 
        />
      </div>

      {authUser?.role === 'Admin' && (
        <div className="form__field">
          <label className="form__label">Reasignar Creador / Usuario</label>
          <select 
            className="form__input"
            name="newCreatedBy" 
            value={ newCreatedBy } 
            onChange={ onInputChange }
          >
            <option value="" disabled>&mdash; Selecciona un usuario &mdash;</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name || u.email} ({u.role}) - {u.email}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form__buttons">
        <button className="btn btn--black">Actualizar Evento</button>
      </div>
    </form>
  )
}
