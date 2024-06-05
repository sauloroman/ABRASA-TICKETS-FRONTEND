import abrasaLogo from '../../../../../assets/img/logo-light.png';
import { useUI } from '../../../../../hooks';

export const EventTickets = () => {

  const { openModal } = useUI();

  return (
    <div className="event-tickets">
      <header className="event-tickets__header">
        <h2 className="event-tickets__title">Boletos Digitales</h2>
        <figure className="event-tickets__figure">
          <img src={ abrasaLogo } alt="Abrasa Logo" />
        </figure>
      </header>
      <ul className="event-tickets__instru">
        <li className='event-tickets__item'>
          <i className='bx bx-check-circle events-information__icon' ></i>
          <p>Crea un invitado</p>
        </li>
        <li className='event-tickets__item'>
          <i className='bx bx-check-circle events-information__icon' ></i>
          <p>Asigna a cada invitado la cantidad de boletos</p>
        </li>
      </ul>
      <div className="event-tickets__buttons">
        <button onClick={ () => openModal('eventPageModal', 'scanTicket') } className="btn btn--outline event-tickets__button">
          <i className='bx bx-barcode-reader event-tickets__iconButton' ></i>
          Escanear Boletos
        </button>
        <button onClick={ () => openModal('eventPageModal', 'createTicket')} className="btn btn--outline event-tickets__button">
          <i className='bx bx-plus event-tickets__iconButton' ></i>
          Crear Boleto
        </button>
      </div>
    </div>
  )
}
