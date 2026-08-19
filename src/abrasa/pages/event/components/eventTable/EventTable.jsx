import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEvents, useTickets } from '../../../../hooks';
import { EventButtons, EventPagination } from '../';
import { useUI } from '../../../../../hooks';
import { useAuthentication } from '../../../../../auth/hooks';

export const EventTable = () => {
  const { id } = useParams();

  const {
    tickets,
    isLoading,
    total,
    page,

    getTicketsByEvent,
  } = useTickets();

  const { openModal } = useUI();
  const { event } = useEvents();
  const { user } = useAuthentication();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendBulkWhatsApp = () => {
    if (!id) return;
    openModal('confirmModal', 'sendBulkWhatsApp', id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (id) {
        getTicketsByEvent({
          eventID: id,
          page: page || 1,
          limit: 30,
          name: searchTerm,
        });
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, id, page]);

  return (
    <div className="event-table">
      <header className="event-table__header">
        <div>
          <h2 className="heading-secondary event-table__title">
            <div className="event-table__icon">
              <i className="bx bx-barcode event-table__icon-element"></i>
            </div>
            Boletos creados
          </h2>
          <p className="event-table__text">
            Puedes enviar todos tus boletos con un solo click y consultar el
            estado de cada boleto.
          </p>
        </div>

        {user?.role !== 'Cliente' && (
          <button
            onClick={handleSendBulkWhatsApp}
            disabled={!tickets.length}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#25D366',
              border: 'none',
              color: '#ffffff',
              fontWeight: '600',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
              fontSize: '14px'
            }}
          >
            <i className="bx bxl-whatsapp" style={{ fontSize: '20px' }}></i> Enviar Todos los Boletos (Masivo)
          </button>
        )}
      </header>

      {/* Prominent High-Visibility Search Hero Bar */}
      <div className="event-table__search-bar">
        <div className="event-table__search-input-wrapper">
          <i className="bx bx-search-alt-2 event-table__search-icon"></i>
          <input
            type="text"
            placeholder="Buscar boletos por nombre, teléfono, mesa o clave de acceso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="event-table__search-input"
          />
          {isLoading && (
            <i className="bx bx-loader-alt bx-spin event-table__search-spinner"></i>
          )}
          {searchTerm && !isLoading && (
            <button
              onClick={() => setSearchTerm('')}
              className="event-table__search-clear"
              title="Limpiar búsqueda"
            >
              <i className="bx bx-x"></i>
            </button>
          )}
        </div>
        <div className="event-table__search-counter">
          <span className="event-table__counter-badge">
            <i className="bx bx-list-check"></i> {total} {total === 1 ? 'boleto' : 'boletos'}
          </span>
        </div>
      </div>

      <EventButtons />

      <div className="event-table__content">
        <table className="event-table__table">
          <thead className="event-table__thead">
            <tr className="event-table__tr">
              <th className="event-table__th">Nombre</th>
              <th className="event-table__th">Teléfono</th>
              <th className="event-table__th">Adultos</th>
              <th className="event-table__th">Infantes</th>
              <th className="event-table__th">#Mesa</th>
              <th className="event-table__th">Clave</th>
              <th className="event-table__th">Acciones</th>
            </tr>
          </thead>

          <tbody className="event-table__tbody">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="event-table__tr">
                <td className="event-table__td">{ticket.name}</td>
                <td className="event-table__td">{ticket.phone}</td>
                <td className="event-table__td">{ticket.adultsQuantity - ticket.adultsCounter}</td>
                <td className="event-table__td">{ticket.kidsQuantity - ticket.kidsCounter}</td>
                <td className="event-table__td">{ticket.table}</td>
                <td className="event-table__td">{ticket.keyPass}</td>
                <td className="event-table__td ">

                  <a
                    className='event-table__tlink'
                    target='_blank'
                    rel="noreferrer"
                    href={`https://wa.me/52${ticket.phone}?text=Hola ${ticket.name}. El equipo de ${event?.client || 'Atelier Eventos'} te saluda cordialmente 🔥.Queremos mandarte tu invitación web para tu próximo evento el ${event?.eventDate || ''}. Compártela únicamente con tus invitados y reserva tu esperada fecha. %0A%0A🌐Invitación web: ${event?.invitation || ''} %0A🔑Clave de acceso: ${ticket.keyPass} %0A%0A Nota: No compartas esta clave con nadie más pues tus boletos electrónicos pueden ser clonados. Presenta tus boletos el día de tu evento y listo 🔥.`}>
                    <i
                      title="Enviar Boleto (WhatsApp)"
                      className="bx bx-send event-table__ticon"
                    ></i>
                  </a>

                  {user?.role !== 'Cliente' && (
                    <>
                      <i
                        onClick={() => openModal('eventPageModal', 'updateTicket', ticket)}
                        title="Editar Boleto"
                        className="bx bx-edit  event-table__ticon"
                      ></i>
                      <i
                        onClick={() => openModal('confirmModal', 'deleteTicket', ticket.id)}
                        title="Eliminar Boleto"
                        className="bx bx-trash  event-table__ticon"
                      ></i>
                    </>
                  )}
                  <a target='_blank' className='event-table__tlink' href={ticket.qrCode}>
                    <i
                      title="Ver Boleto"
                      className="bx bx-show event-table__ticon"
                    ></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tickets.length && <EventPagination />}
    </div>
  );
};
