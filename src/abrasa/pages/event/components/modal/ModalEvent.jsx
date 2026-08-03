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
    modalTitle = 'Eliminar Boleto';
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
    </LayoutModal>
  );
};
