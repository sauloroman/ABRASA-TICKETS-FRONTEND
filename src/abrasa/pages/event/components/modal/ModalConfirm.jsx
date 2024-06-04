import { useAuthentication } from "../../../../../auth/hooks";
import { useUI } from "../../../../../hooks"
import { useEvents, useTickets } from "../../../../hooks";

export const ModalConfirm = () => {

  const { event: { id } } = useEvents();
  const { confirmModal: { data }, closeModal } = useUI();
  const { deleteTicket } = useTickets();

  const onDeleteTicket = ( e ) => {

    e.preventDefault();

    deleteTicket(
      data,
      { eventID: id, page: 1, limit: 15 }
    );

    closeModal('confirmModal');
  }

  return (
    <div className="confirm">
      <div className="confirm__question">¿Estás seguro que deseas eliminar este elemento? <br />Esta acción ya no podrá recuperar el elemento en cuestión.</div>
      <div className="confirm__buttons">
        <button onClick={ onDeleteTicket } className="confirm__button btn btn--outline">Aceptar</button>
        <button onClick={ () => closeModal('confirmModal') } className="confirm__button btn btn--black">Cancelar</button>
      </div>
    </div>
  )
}
