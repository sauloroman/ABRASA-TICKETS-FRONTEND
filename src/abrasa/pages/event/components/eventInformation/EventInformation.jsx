import { useUI } from "../../../../../hooks";
import { useEvents } from "../../../../hooks"

export const EventInformation = () => {

  const { event } = useEvents();
  const { openModal } = useUI();

  return (
    <section className="event-information">
      <div className="event-information__container">

        <div className="event-information__content">
          <header className="event-information__header">
            <h2 className="event-information__title">
              <div className="event-information__icon">
                <i className="bx bx-info-square event-information__icon-element"></i>
              </div>
              { event.name }
            </h2>
          </header>
          <figure className="event-information__figure">
            {
              event.image 
              ? <img className="event-information__figure-image" src={event.image} alt="Imagen del evento" /> 
              : <div className="event-information__figure-overlay"></div> 
            }
            <button 
              onClick={ () => openModal('eventPageModal', 'uploadEventPhoto') } className="event-information__figure-button"
            >
              <i className='bx bxs-camera'></i>
            </button>
          </figure>
          <ul className="event-information__list">
            <li className="event-information__item">Descripción: <span>{event.description}</span></li>
            <li className="event-information__item">
              Fecha del evento: <span>{event.eventDate}</span>
            </li>
            <li className="event-information__item">
              Tipo de evento: <span className="events-card__tag">{event.eventType}</span>
            </li>
            <li className="event-information__item">
              <p>Cliente: <span>{event.client}</span></p>
            </li>
            <li className="event-information__item event-information__item--last">
              <p>Invitación: <span>{ event.invitation ? <a href={event.invitation} target="_blank">Ver Invitación</a> : 'Sin invitación'} </span></p>
            </li>
          </ul>
          <button 
            onClick={() => openModal('eventPageModal', 'updateEvent') } 
            className="btn btn--outline event-information__button"
          >Editar Evento
          </button>
          <button 
            onClick={ () => openModal('eventPageModal', 'scanTicket') }
            className="btn btn--dark event-information__button">
            <i className='bx bx-qr-scan event-buttons__icon'></i>  
            Escanear Boleto
          </button>
        </div>
      </div>
    </section>
  )
}
