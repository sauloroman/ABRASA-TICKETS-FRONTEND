import { useMemo } from 'react';
import { useEvents } from '../../../../hooks';
import { useUI } from '../../../../../hooks';
import { useAuthentication } from '../../../../../auth/hooks';

export const EventsInformation = () => {
  const { filter, total } = useEvents();
  const { openModal } = useUI();
  const { user } = useAuthentication();

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
      <div className="events-information__grid">
        <div className="events-information__box">
          <header className="events-information__header">
            <h2 className="events-information__title">{dynamicTitle}</h2>
          </header>
          <div className="events-information__container">
            <p className="events-information__number">
              {total} <span> {total === 1 ? 'evento' : 'eventos'}</span>
            </p>
            <p className="events-information__text">
              Administración de todos tus eventos en tiempo real.
            </p>
          </div>
        </div>

        {user?.role !== 'Cliente' && (
          <div className="events-information__box">
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
        )}
      </div>
    </section>
  );
};
