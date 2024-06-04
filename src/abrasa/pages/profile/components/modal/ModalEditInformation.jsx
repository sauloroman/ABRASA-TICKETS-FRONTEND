import { useState } from 'react';
import { useForm, useUI } from '../../../../../hooks';
import { useProfile } from '../../../../hooks/useProfile';

const formValidations = {
  nameNew: [
    (value) => value.trim().length <= 60,
    'El nombre debe ser menor a 60 caracteres',
  ],
  addressNew: [
    (value) => value.trim().length <= 100,
    'La dirección debe ser menor a 100 caracteres',
  ],
  locationNew: [
    (value) => value.trim().length <= 100,
    'La ciudad debe ser menor a 100 caracteres',
  ],
  phoneNew: [(value) => value.trim().length <= 10, 'El teléfono debe ser a 10 dígitos'],
  professionNew: [
    (value) => value.trim().length <= 100,
    'La prefisión debe ser menor a 100 caracteres',
  ],
};

export const ModalEditInformation = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);  
  const { updateProfile, profile } = useProfile();
  const { user: {name}, address, location, phone, profession } = profile;

  const {
    nameNew, addressNew, locationNew, phoneNew, formState, professionNew,
    nameNewValid, addressNewValid, locationNewValid, phoneNewValid, professionNewValid,
    isFormValid, onInputChange,
  } = useForm({
    professionNew: profession,
    nameNew: name,
    addressNew: address,
    locationNew: location,
    phoneNew: phone
  }, formValidations);

  const { closeModal } = useUI();

  const onUpdateUser = ( e ) => {

    e.preventDefault();
    setFormSubmitted( true );
    
    if ( !isFormValid ) return;

    const finalData = {}

    for( const field of Object.keys( formState ) ) {
      const nameProperty = field.split('N')[0];

      if( !formState[field] ) {
        finalData[ nameProperty ] = 'Sin datos';
        continue;
      }

      finalData[nameProperty] = formState[field];
    }

    console.log(finalData);

    updateProfile( profile.id, finalData );
    closeModal( 'profilePageModal' );

    setFormSubmitted( false );
  }

  return (
    <form onSubmit={ onUpdateUser } className="form">
      <div className="form__field">
        <label className="form__label">Nombre</label>
        <input
          name='nameNew'
          value={nameNew}
          onChange={ onInputChange }
          placeholder="Cambiar nombre"
          type="text"
          className="form__input"
        />
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {nameNewValid}
        </span>
      </div>
      <div className="form__field">
        <label className="form__label">Dirección</label>
        <input
          name='addressNew'
          value={addressNew}
          onChange={ onInputChange }
          placeholder="Cambiar dirección"
          type="text"
          className="form__input"
        />
         <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {addressNewValid}
        </span>
      </div>
      <div className="form__field">
        <label className="form__label">Ciudad</label>
        <input
          name='locationNew'
          value={locationNew}
          onChange={ onInputChange }
          placeholder="Cambiar ciudad"
          type="text"
          className="form__input"
        />
         <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {locationNewValid}
        </span>
      </div>
      <div className="form__field">
        <label className="form__label">Teléfono</label>
        <input
          name='phoneNew'
          value={phoneNew}
          onChange={ onInputChange }
          placeholder="Cambiar teléfono"
          type="phone"
          className="form__input"
        />
         <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {phoneNewValid}
        </span>
      </div>
      <div className="form__field">
        <label className="form__label">Profesión</label>
        <input
          name='professionNew'
          value={professionNew}
          onChange={ onInputChange }
          placeholder="Cambiar teléfono"
          type="phone"
          className="form__input"
        />
         <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {professionNewValid}
        </span>
      </div>
      <div className="form__button">
        <button type='submit' className="btn btn--black">Actualizar información</button>
      </div>
    </form>
  );
};
