import { useNavigate } from "react-router-dom";
import { useUI } from "../../../../../hooks";
import { useEvents } from "../../../../hooks";
import { useAuthentication } from "../../../../../auth/hooks";

export const EventButtons = () => {
  const navigate = useNavigate();
  const { event } = useEvents();
  const { openModal } = useUI();
  const { user } = useAuthentication();

  return (
    <div className="event-buttons">
      {user?.role !== 'Cliente' && (
        <button
          onClick={() => openModal('eventPageModal', 'scanTicket')}
          className="btn btn--outline event-buttons__button event-buttons__button--scanned"
        >
          <i className='bx bx-qr-scan event-buttons__icon'></i>
          Escanear Boleto
        </button>
      )}
      <div className="event-buttons__delicated">
        {user?.role !== 'Cliente' && (
          <button
            onClick={() => openModal('eventPageModal', 'createTicket')}
            className="btn btn--outline event-buttons__button"
          >
            <i className='bx bx-add-to-queue event-buttons__icon'></i>
            Crear Boleto
          </button>
        )}
        <button
          onClick={() => navigate(`/event-confirmations/${event.id}`)}
          className="btn btn--outline event-buttons__button"
        >
          <i className='bx bx-check-double event-buttons__icon'></i>
          Ver Confirmaciones
        </button>
        {user?.role !== 'Cliente' && (
          <button
            onClick={() => openModal('confirmModal', 'deleteTickets')}
            className="btn btn--outline event-buttons__button"
          >
            <i className='bx bx-trash event-buttons__icon'></i>
            Eliminar Boletos
          </button>
        )}
        {user?.role !== 'Cliente' && (
          <button
            onClick={() => openModal('eventPageModal', 'importExcel')}
            className="btn btn--outline event-buttons__button"
          >
            <i className='bx bx-file-find event-buttons__icon'></i>
            Importar Excel
          </button>
        )}
      </div>
    </div>
  );
};
