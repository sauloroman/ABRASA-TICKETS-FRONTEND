import { useRef, useState } from 'react';
import { useEvents, useTickets } from '../../../../hooks';
import { EventPagination } from '../';
import { EventStats } from '../eventStats/EventStats';
import { useUI } from '../../../../../hooks';

export const EventTable = () => {

  const { tickets } = useTickets();
  const { openModal } = useUI();
  const { event } = useEvents();

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
                    className='event-table__tlink' 
                    target='_blank' 
                    href={`https://wa.me/${ticket.phone}?text=Hola ${ticket.name}. El equipo de las Brasas te saluda cordialmente 🔥.Queremos mandarte tu invitación web para tu próximo evento el ${event.eventDate}. Compártela únicamente con tus invitados y reserva tu esperada fecha. %0A%0A Invitación web: https://cbtis280-graduation.netlify.app %0A Clave de acceso: ${ ticket.keyPass } %0A%0A Nota: No compartas esta clave con nadie más pues tus boletos electrónicos pueden ser clonados. Presenta tus boletos el día de tu evento y listo 🔥. %0A Si deseas comprar más boletos, comunicate al número 4496548073 o 4499198188.` }>
                    <i
                      title="Enviar Boleto"
                      className="bx bx-send  event-table__ticon"
                    ></i>
                  </a>
                  <i
                    onClick={() => openModal('eventPageModal', 'updateTicket', ticket)}
                    title="Editar Boleto"
                    className="bx bx-edit  event-table__ticon"z
                  ></i>
                  <i
                    onClick={() => openModal('confirmModal', 'deleteTicket', ticket.id)}
                    title="Eliminar Boleto"
                    className="bx bx-trash  event-table__ticon"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tickets.length && <EventPagination /> }
    </div>
  );
};
