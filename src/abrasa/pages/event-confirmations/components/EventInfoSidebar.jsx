import { useState } from 'react';
import PropTypes from 'prop-types';

export const EventInfoSidebar = ({ event }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!event?.invitation) return;
    navigator.clipboard.writeText(event.invitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No definida';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="event-info-sidebar">
      <div className="event-info-sidebar__card">
        <h3 className="event-info-sidebar__title">
          <i className="bx bx-info-square"></i> Información del Evento
        </h3>

        {event?.image && (
          <div className="event-info-sidebar__image-container">
            <img src={event.image} alt={event.name} className="event-info-sidebar__image" />
          </div>
        )}

        <ul className="event-info-sidebar__list">
          <li className="event-info-sidebar__item">
            <i className="bx bx-calendar"></i>
            <div>
              <span className="event-info-sidebar__label">Fecha:</span>
              <p className="event-info-sidebar__value">{formatDate(event?.eventDate)}</p>
            </div>
          </li>

          <li className="event-info-sidebar__item">
            <i className="bx bx-purchase-tag-alt"></i>
            <div>
              <span className="event-info-sidebar__label">Categoría:</span>
              <p className="event-info-sidebar__value">{event?.eventType || 'Sin categoría'}</p>
            </div>
          </li>

          {event?.client && (
            <li className="event-info-sidebar__item">
              <i className="bx bx-user"></i>
              <div>
                <span className="event-info-sidebar__label">Cliente:</span>
                <p className="event-info-sidebar__value">{event.client}</p>
              </div>
            </li>
          )}

          {event?.description && (
            <li className="event-info-sidebar__item">
              <i className="bx bx-detail"></i>
              <div>
                <span className="event-info-sidebar__label">Descripción:</span>
                <p className="event-info-sidebar__value event-info-sidebar__value--desc">
                  {event.description}
                </p>
              </div>
            </li>
          )}
        </ul>

        {event?.invitation && (
          <div className="event-info-sidebar__invitation">
            <span className="event-info-sidebar__label">Enlace a la Invitación:</span>
            <div className="event-info-sidebar__link-box">
              <a
                href={event.invitation}
                target="_blank"
                rel="noreferrer"
                className="event-info-sidebar__link"
              >
                <i className="bx bx-link-external"></i> Abrir Invitación
              </a>
              <button
                onClick={handleCopyLink}
                className="event-info-sidebar__copy-btn"
                title="Copiar enlace"
              >
                <i className={copied ? 'bx bx-check' : 'bx bx-copy'}></i>
              </button>
            </div>
            {copied && (
              <span className="event-info-sidebar__copied-toast">Enlace copiado al portapapeles</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

EventInfoSidebar.propTypes = {
  event: PropTypes.object,
};
