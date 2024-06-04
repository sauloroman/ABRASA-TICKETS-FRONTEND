import { useUI } from "../../../../../hooks";
import { useEvents, useLoadFile } from "../../../../hooks";

const validExtentions = ['jpg', 'jpeg', 'png', 'webp'];

export const ModalUploadEventPhoto = () => {

  const {
    buttonDeleteImageRef,
    buttonSelectImageRef,
    buttonUpdateImageRef,
    errorMessageRef,
    inputFileRef,
    imageRef,
    errorMessage,
    imageUrl,
    onCancelFile, 
    onClickInput, 
    onInputFileChange, 
    file
  } = useLoadFile(validExtentions); 
  const { updateEventPhoto, event: { id } } = useEvents();
  const { closeModal } = useUI();

  const onSendFile = ( e ) => {
    if ( !file ) return;
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file );
    updateEventPhoto( formData, id )
    closeModal('eventPageModal');
  }

  return (
    <form className="form mb-s">
      <div className="form__field">
        <p className="form__instructions">
          Selecciona una imagen en formato{' '}
          <span>{validExtentions.join(' ')}</span>
        </p>
        <p className="form__instructions">Tamaño máximo: 1M</p>
      </div>
      <div ref={imageRef} className="form__area hide-element">
        <img src={imageUrl} alt="Loaded image" />
      </div>
      <p ref={errorMessageRef} className="form__errorMessage hide-element">
        {errorMessage}
      </p>
      <div className="form__buttons">
        <input
          onChange={onInputFileChange}
          ref={inputFileRef}
          className="hide-element"
          type="file"
        />
        <button
          ref={buttonSelectImageRef}
          onClick={onClickInput}
          className="btn btn--outline"
        >
          Seleccionar imagen
        </button>
        <button
          onClick={onCancelFile}
          ref={buttonDeleteImageRef}
          className="btn btn--outline hide-element"
        >
          Eliminar imagen
        </button>
        <button
          onClick={onSendFile}
          ref={buttonUpdateImageRef}
          className="btn btn--outline hide-element"
        >
          Actualizar foto
        </button>
      </div>
    </form>
  )
}
