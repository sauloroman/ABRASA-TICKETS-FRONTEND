import { useUI } from '../../../../../hooks';
import { useEvents, useTickets } from '../../../../hooks';

export const ModalConfirmDeleteTickets = () => {
  const {
    event: { id },
  } = useEvents();
  const { closeModal } = useUI();
  const { deleteAllTicketsOfEvent } = useTickets();

  const onDeleteTickets = (e) => {
    e.preventDefault();
    deleteAllTicketsOfEvent(id, { eventID: id, page: 1, limit: 15 });
    closeModal('confirmModal');
  };

  return (
    <div className="confirm">
      <div className="confirm__question">
        ¿Estás seguro que deseas eliminar este elemento? <br />
        Esta acción ya no podrá recuperar el elemento en cuestión.
      </div>
      <div className="confirm__buttons">
        <button
          onClick={onDeleteTickets}
          className="confirm__button btn btn--outline"
        >
          Aceptar
        </button>
        <button
          onClick={() => closeModal('confirmModal')}
          className="confirm__button btn btn--black"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
