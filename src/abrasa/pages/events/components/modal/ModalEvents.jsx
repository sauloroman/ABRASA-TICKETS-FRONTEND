import { useUI } from "../../../../../hooks"
import { LayoutModal } from "../../../../layout"
import { ModalConfirm } from "./ModalConfirm";
import { ModalCreateEvent } from "./ModalCreateEvent"

export const ModalEvents = () => {

  const { eventsPageModal, confirmModal } = useUI();

  const nameModal = confirmModal.isOpen ? 'confirmModal' : 'eventsPageModal';
  const titleModal = confirmModal.isOpen ? 'Eliminar Evento' : 'Crear Evento';

  return (
    <LayoutModal title={ titleModal } modalName={ nameModal }>
      { confirmModal.selectedModal === 'deleteEvent' && <ModalConfirm />}
      { eventsPageModal.selectedModal === 'createEvent' && <ModalCreateEvent />}
    </LayoutModal>
  )
}
