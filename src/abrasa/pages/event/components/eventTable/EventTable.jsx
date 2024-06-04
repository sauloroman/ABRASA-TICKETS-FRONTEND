import { useTickets } from '../../../../hooks';
import { EventPagination } from '../';
import { EventStats } from '../eventStats/EventStats';
import { useUI } from '../../../../../hooks';

export const EventTable = () => {
  const { tickets } = useTickets();
  const { openModal } = useUI();

  return (
    <div className="event-table">
      <header className="event-table__header">
        <div>
          <h2 className="heading-secondary event-table__title">
            <div className="event-table__icon">
              <i className="bx bx-barcode event-table__icon-element"></i>
            </div>
            Tus boletos
          </h2>
          <p className="event-table__text">
            Puedes enviar todos tus boletos con un solo click y consultar el
            estado de cada boleto.
          </p>
          <EventStats />
        </div>
        <div className="event-table__buttons">
          <button className=" event-table__button btn btn--success">
            Enviar boletos
          </button>
          <button
            onClick={() => openModal('confirmModal', 'deleteTickets')}
            className=" event-table__button btn btn--error"
          >
            Eliminar boletos
          </button>
        </div>
      </header>

      <div className="event-table__content">
        <table className="event-table__table">
          <thead className="event-table__thead">
            <tr className="event-table__tr">
              <th className="event-table__th">Id</th>
              <th className="event-table__th">Nombre</th>
              <th className="event-table__th">Teléfono</th>
              <th className="event-table__th">Adultos</th>
              <th className="event-table__th">Niños</th>
              <th className="event-table__th">Clave</th>
              <th className="event-table__th">Códio QR</th>
              <th className="event-table__th">Acciones</th>
            </tr>
          </thead>

          <tbody className="event-table__tbody">
            {tickets.map((ticket, i) => (
              <tr key={ticket.id} className="event-table__tr">
                <td className="event-table__td">{ticket.id}</td>
                <td className="event-table__td">{ticket.name}</td>
                <td className="event-table__td">{ticket.phone}</td>
                <td className="event-table__td">{ticket.adultsQuantity}</td>
                <td className="event-table__td">{ticket.kidsQuantity}</td>
                <td className="event-table__td">{ticket.keyPass}</td>
                <td className="event-table__td">
                  <a href={ticket.qrCode} target="_blank">
                    Ver Imagen
                  </a>
                </td>
                <td className="event-table__td ">
                  <a
                    target="_blank"
                    className="event-table__tlink"
                    href={`https://wa.me/${ticket.phone}?text=Hola ${
                      ticket.name
                    }. Aqui tienes tu invitación para tu evento.${'\n'} Tu clave de acceso es: ${
                      ticket.keyPass
                    }`}
                  >
                    <i
                      title="Enviar Boleto"
                      class="bx bx-send  event-table__ticon"
                    ></i>
                  </a>
                  <i
                    onClick={() =>
                      openModal('eventPageModal', 'updateTicket', ticket)
                    }
                    title="Editar Boleto"
                    class="bx bx-edit  event-table__ticon"
                  ></i>
                  <i
                    onClick={() =>
                      openModal('confirmModal', 'deleteTicket', ticket.id)
                    }
                    title="Eliminar Boleto"
                    class="bx bx-trash  event-table__ticon"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tickets.length ? <EventPagination /> : <></>}
    </div>
  );
};
