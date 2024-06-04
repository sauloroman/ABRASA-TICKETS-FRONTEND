import { useMemo } from 'react';
import { useEvents } from '../../../../hooks';
import { useUI } from '../../../../../hooks';

export const EventsInformation = () => {
  const { filter, events, total } = useEvents();
  const { openModal } = useUI();

  const dynamicTitle = useMemo(() => {
    switch (filter) {
      case 'todos':
        return 'Todos los eventos';
      case 'graduación':
        return 'Todas las graduaciones';
      case 'posada':
        return 'Todas las posadas';
      case 'xv':
        return 'Todos los XV años';
      case 'boda':
        return 'Todas las bodas';
      default:
        return 'Filtro no reconocido';
    }
  }, [filter]);

  return (
    <section className="events-information">
      <figure className="events-information__figure">
        <header className="events-information__figure-header">
          <div className="events-information__figure-boxicon">
            <i className="bx bx-party events-information__figure-icon"></i>
          </div>
          <div className="events-information__figure-category">
            <p className="events-information__figure-title">{dynamicTitle}</p>
            <p className="events-information__figure-number">
              {filter === 'todos' ? total : events.length}
            </p>
          </div>
        </header>
        <div className="events-information__figure-information">
          {events.length ? (
            <p>
              Próximo evento: <span>10/03/2024</span>
            </p>
          ) : (
            <p>Tu próximo evento será genial</p>
          )}
        </div>
      </figure>
      <div className="events-information__container">
        <h2 className="events-information__container-title">{dynamicTitle}</h2>

        <div className="events-information__instru">
          <ul className="events-information__list">
            <li className="events-information__item">
              <i className="bx bx-check-circle events-information__icon"></i>
              Presiona sobre uno de tus eventos para ver todos los detalles
            </li>
            <li className="events-information__item">
              <i className="bx bx-check-circle events-information__icon"></i>
              Puedes crear un nuevo evento.
            </li>
            <li className="events-information__item">
              <i className="bx bx-check-circle events-information__icon"></i>
              Puedes editar algún evento.
            </li>
          </ul>
          <div className="events-information__buttons">
            <button
              onClick={() => openModal('eventsPageModal', 'createEvent')}
              className="btn btn--outline events-information__button"
            >
              <i className="bx bx-plus"></i>
              Crear Evento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
