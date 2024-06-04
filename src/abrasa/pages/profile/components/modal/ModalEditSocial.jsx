import { useState } from "react";
import { useForm, useUI } from "../../../../../hooks"
import { useProfile } from "../../../../hooks";

const formValidations = {
  bioNew: [ value => value.length <= 120, 'La biografía debe ser menor a 120 caracteres'],
}

export const ModalEditSocial = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { profile, updateProfile } = useProfile();
  const { closeModal } = useUI();
  const { bio, facebook, instagram, tiktok, website } = profile;

  const {
    bioNew, facebookNew, instagramNew, tiktokNew, websiteNew, formState,
    bioNewValid, isFormValid, onInputChange, onResetForm } = useForm({
    bioNew: bio,
    facebookNew: facebook,
    instagramNew: instagram,
    titkokNew: tiktok,
    websiteNew: website,
  }, formValidations );

  const onUpdateSocial = ( e ) => {

    e.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    const finalData = {}

    for( const field of Object.keys( formState ) ) {
      const nameProperty = field.split('N')[0];
      finalData[nameProperty] = formState[field];
    }

    updateProfile( profile.id, finalData );
    closeModal( 'profilePageModal' );
    setFormSubmitted(false);
    onResetForm();
  }

  return (
    <form onSubmit={ onUpdateSocial } className="form">
      <div className="form__field">
        <label htmlFor="newBiography" className="form__label">Biografía</label>
        <textarea 
          placeholder="Cambiar biografía"
          id="newBiography"
          name="bioNew"
          value={ bioNew }
          onChange={ onInputChange }
          type="text" 
          className="form__input form__textarea" 
        ></textarea>
        <span
          className={`form__span ${
            !isFormValid && formSubmitted ? 'text-wrong' : null
          }`}
        >
          {bioNewValid}
        </span>
      </div>
      <div className="form__field">
        <label htmlFor="website" className="form__label">Sitio Web</label>
        <input 
          name="websiteNew"
          value={ websiteNew }
          onChange={ onInputChange }
          placeholder="Introduce link para tu sitio web"
          id="website"
          type="text" 
          className="form__input" 
        />
      </div>
      <div className="form__field">
        <label htmlFor="facebook" className="form__label">Facebook</label>
        <input 
          placeholder="Introduce link para tu Facebook"
          id="facebook"
          name="facebookNew"
          value={ facebookNew }
          onChange={ onInputChange }
          type="text" 
          className="form__input" 
        />
      </div>
      <div className="form__field">
        <label htmlFor="instagram" className="form__label">Instagram</label>
        <input 
          placeholder="Introduce link para tu Instagram"
          id="instagram"
          name="instagramNew"
          value={ instagramNew }
          onChange={ onInputChange }
          type="text" 
          className="form__input" 
        />
      </div>
      <div className="form__field">
        <label htmlFor="tiktok" className="form__label">TikTok</label>
        <input 
          placeholder="Introduce link para tu TikTok"
          id="tiktok"
          name="tiktokNew"
          value={ tiktokNew }
          onChange={ onInputChange }
          type="text" 
          className="form__input" 
        />
      </div>
      <div className="form__button">
        <button type='submit' className="btn btn--black">Actualizar información</button>
      </div>
    </form>
  )
}
