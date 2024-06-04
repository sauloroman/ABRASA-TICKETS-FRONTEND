import { useAuthentication } from "../../../../../auth/hooks";
import { useUI } from "../../../../../hooks";
import { useEvents } from "../../../../hooks"

export const ModalConfirm = () => {

  const { user: { id } } = useAuthentication();
  const { deleteEvent } = useEvents();
  const { closeModal, confirmModal: { data } } = useUI();

  const onDeleteEvent = ( e ) => {

    e.preventDefault();

    deleteEvent( 
      data,
      { userID: id, page: 1, limit: 6, category: 'todos' }
    );

    closeModal('confirmModal');
  }

  return (
    <div className="confirm">
      <div className="confirm__question">¿Estás seguro que deseas eliminar este elemento? <br />Esta acción ya no podrá recuperar el elemento en cuestión.</div>
      <div className="confirm__buttons">
        <button onClick={ onDeleteEvent } className="confirm__button btn btn--outline">Aceptar</button>
        <button onClick={ () => closeModal('confirmModal') } className="confirm__button btn btn--black">Cancelar</button>
      </div>
    </div>
  )
}
