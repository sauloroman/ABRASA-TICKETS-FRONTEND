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
            <h1 className="event-information__title">{ event.name }</h1>
          </header>
          <div className="event-information__text">{event.description}</div>
          <ul className="event-information__list">
            <li className="event-information__item">
              Fecha del evento: <span>{event.eventDate}</span>
            </li>
            <li className="event-information__item">
              Tipo de evento: <span className="events-card__tag">{event.eventType}</span>
            </li>
            <li className="event-information__item event-information__item--last">
              <p>Cliente: <span>{event.client}</span></p>
              <div className="event-information__buttons">
                <button onClick={ () => openModal('eventPageModal', 'updateEvent') } className="event-information__button">
                  <i className='bx bx-edit-alt event-information__icon' ></i>
                </button>
                <button onClick={ () => openModal('eventPageModal', 'uploadEventPhoto') } className="event-information__button">
                  <i className='bx bxs-camera event-information__icon' ></i>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
