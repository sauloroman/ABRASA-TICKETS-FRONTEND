import { useUI } from "../../../../../hooks"

export const EventButtons = () => {

  const { openModal } = useUI();

  return (
    <div className="event-buttons">
      <button 
        onClick={ () => openModal('eventPageModal', 'scanTicket') }
        className="btn btn--outline event-buttons__button event-buttons__button--scanned">
        <i className='bx bx-qr-scan event-buttons__icon'></i>  
        Escanear Boleto
      </button>
      <div className="event-buttons__delicated">
        <button 
          onClick={ () => openModal('eventPageModal', 'createTicket') }
          className="btn btn--outline event-buttons__button">
          <i className='bx bx-add-to-queue event-buttons__icon'></i>  
          Crear Boleto
        </button>
        <button 
          onClick={ () => openModal('confirmModal', 'deleteTickets') }
          className="btn btn--outline event-buttons__button">
          <i className='bx bx-trash event-buttons__icon'></i>  
          Eliminar Boletos
        </button>
      </div>
    </div>
  )
}
