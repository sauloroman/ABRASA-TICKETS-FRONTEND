import { useScanTicket } from '../../../../hooks';

export const ScanTicketInfo = () => {
  const { ticketScanned } = useScanTicket();
  const { id, name, adultsQuantity, kidsQuantity, qrCode, phone, adultsCounter, kidsCounter } =
    ticketScanned;

  return (
    <div className="scanTicket-info">
      <figure className="scanTicket-info__figure">
        <img
          className="scanTicket-info__image"
          src={qrCode}
          alt="Qr Code Ticket"
        />
      </figure>
      <div className="scanTicket-info__content">
        <header className="scanTicket-info__header">
          <h3 className="scanTicket-info__title">Información del boleto</h3>
        </header>
        <p className="text-center scanTicket-info__id">{id}</p>
        <p className="scanTicket-info__text">
          Nombre: <span>{name}</span>
        </p>
        <p className="scanTicket-info__text">
          Teléfono: <span>{phone}</span>
        </p>
        <div className="scanTicket-info__box">
          <div className="scanTicket-info__quantity">
            <p>Adultos</p>
            <span>{adultsQuantity - adultsCounter}</span>
          </div>
          <div className="scanTicket-info__quantity">
            <p>Niños</p>
            <span>{kidsQuantity - kidsCounter}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
