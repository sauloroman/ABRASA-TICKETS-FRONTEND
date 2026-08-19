import { useUI } from '../../../../../hooks';
import { LayoutModal } from '../../../../layout/modal/LayoutModal';
import {
  ModalCreateTicket,
  ModalScanTicket,
  ModalUpdateEvent,
  ModalUploadEventPhoto,
  ModalConfirm,
  ModalUpdateTicket,
  ModalConfirmDeleteTickets,
  ModalConfirmSendBulkWhatsApp,
  ModalImportExcel
} from '../';

export const ModalEvent = () => {
  const {
    eventPageModal: { selectedModal },
    confirmModal,
  } = useUI();

  let modalTitle = '';
  let nameModal = '';

  if (confirmModal.isOpen) {
    nameModal = 'confirmModal';
    modalTitle =
      confirmModal.selectedModal === 'sendBulkWhatsApp'
        ? 'Enviar Boletos por WhatsApp'
        : confirmModal.selectedModal === 'deleteTickets'
          ? 'Eliminar Todos los Boletos'
          : 'Eliminar Boleto';
  } else {
    nameModal = 'eventPageModal';
    modalTitle =
      selectedModal === 'createTicket'
        ? 'Crear nuevo boleto'
        : selectedModal === 'importExcel'
          ? 'Importar boletos'
          : selectedModal === 'updateTicket'
            ? 'Actualizar boleto'
            : selectedModal === 'scanTicket'
              ? 'Escanear boleto'
              : selectedModal === 'updateEvent'
                ? 'Actualizar tu evento'
                : 'Nueva foto de evento';
  }

  return (
    <LayoutModal title={modalTitle} modalName={nameModal} isLarge={selectedModal === 'importExcel'}>
      {selectedModal === 'createTicket' && <ModalCreateTicket />}
      {selectedModal === 'importExcel' && <ModalImportExcel />}
      {selectedModal === 'updateTicket' && <ModalUpdateTicket />}
      {selectedModal === 'scanTicket' && <ModalScanTicket />}
      {selectedModal === 'updateEvent' && <ModalUpdateEvent />}
      {selectedModal === 'uploadEventPhoto' && <ModalUploadEventPhoto />}
      {confirmModal.selectedModal === 'deleteTicket' && <ModalConfirm />}
      {confirmModal.selectedModal === 'deleteTickets' && (
        <ModalConfirmDeleteTickets />
      )}
      {confirmModal.selectedModal === 'sendBulkWhatsApp' && (
        <ModalConfirmSendBulkWhatsApp />
      )}
    </LayoutModal>
  );
};