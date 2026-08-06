import { useScanTicket } from '../../../../hooks';

export const ScanTicketInfo = () => {
  const { ticketScanned } = useScanTicket();

  const {
    id,
    name,
    adultsQuantity = 0,
    kidsQuantity = 0,
    qrCode,
    phone,
    adultsCounter = 0,
    kidsCounter = 0,
    table = 'Por asignar',
    keyPass,
  } = ticketScanned || {};

  const adultsAvailable = adultsQuantity - adultsCounter;
  const kidsAvailable = kidsQuantity - kidsCounter;
  const hasPassesAvailable = adultsAvailable > 0 || kidsAvailable > 0;

  return (
    <div className="scanTicket-info">
      <div
        className={`scanTicket-info__status-banner ${hasPassesAvailable
          ? 'scanTicket-info__status-banner--valid'
          : 'scanTicket-info__status-banner--invalid'
          }`}
      >
        <i
          className={`bx ${hasPassesAvailable ? 'bx-check-circle' : 'bx-x-circle'
            } scanTicket-info__banner-icon`}
        ></i>
        <span>
          {hasPassesAvailable
            ? 'BOLETO VÁLIDO - ACCESO PERMITIDO'
            : 'BOLETO AGOTADO - SIN PASES RESTANTES'}
        </span>
      </div>

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

        <p className="text-center scanTicket-info__id">ID: {id}</p>

        <div className="scanTicket-info__text-group">
          <p className="scanTicket-info__text">
            <strong>Invitado:</strong> <span>{name}</span>
          </p>
          <p className="scanTicket-info__text">
            <strong>Teléfono:</strong> <span>{phone}</span>
          </p>
        </div>

        <div className="scanTicket-info__highlight-grid">
          <div className="scanTicket-info__card scanTicket-info__card--table">
            <span className="scanTicket-info__card-label">Mesa Asignada</span>
            <strong className="scanTicket-info__card-value">{table}</strong>
          </div>
          <div className="scanTicket-info__card scanTicket-info__card--key">
            <span className="scanTicket-info__card-label">Clave de Acceso</span>
            <strong className="scanTicket-info__card-value">{keyPass || 'N/A'}</strong>
          </div>
        </div>

        <div className="scanTicket-info__box">
          <div className="scanTicket-info__quantity">
            <p>Adultos Disponibles</p>
            <span className={adultsAvailable > 0 ? 'badge-green' : 'badge-red'}>
              {adultsAvailable} de {adultsQuantity}
            </span>
          </div>
          <div className="scanTicket-info__quantity">
            <p>Niños Disponibles</p>
            <span className={kidsAvailable > 0 ? 'badge-green' : 'badge-red'}>
              {kidsAvailable} de {kidsQuantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
