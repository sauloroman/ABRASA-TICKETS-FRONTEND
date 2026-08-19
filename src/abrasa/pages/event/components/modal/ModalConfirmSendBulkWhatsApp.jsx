import { useUI } from '../../../../../hooks';
import { useEvents, useTickets } from '../../../../hooks';

export const ModalConfirmSendBulkWhatsApp = () => {
  const {
    event: { id },
  } = useEvents();
  const { closeModal } = useUI();
  const { sendBulkWhatsAppTickets } = useTickets();

  const onSendBulkTickets = (e) => {
    e.preventDefault();
    if (id) {
      sendBulkWhatsAppTickets(id);
    }
    closeModal('confirmModal');
  };

  return (
    <div className="confirm">
      <div className="confirm__question">
        ¿Deseas enviar los boletos por WhatsApp de forma masiva a TODOS los asistentes de este evento? <br />
        Esta acción enviará los mensajes oficiales utilizando la API de Meta.
      </div>
      <div className="confirm__buttons">
        <button
          onClick={onSendBulkTickets}
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
