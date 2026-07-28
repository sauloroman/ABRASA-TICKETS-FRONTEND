import PropTypes from 'prop-types';

export const ConfirmationsHeader = ({
  event,
  totalRegistros = 0,
  totalPeople = 0,
  totalAdults = 0,
  totalKids = 0,
}) => {
  const avgPerRegistration = totalRegistros > 0 ? (totalPeople / totalRegistros).toFixed(1) : '0';

  return (
    <header className="confirmations-header">
      <div
        className="confirmations-header__cover"
        style={{ backgroundImage: `url(${event?.image || ''})` }}
      >
        {event?.image ? (
          <div className="confirmations-header__cover-overlay"></div>
        ) : (
          <div className="confirmations-header__cover-default"></div>
        )}
      </div>

      <div className="confirmations-header__card-container">
        <div className="confirmations-header__card">

          <div className="confirmations-header__hero">
            <span className="confirmations-header__subtitle">Panel de Confirmaciones</span>
            <h1 className="confirmations-header__title">
              {event?.name || 'Cargando evento...'}
            </h1>
          </div>

          <div className="confirmations-header__stats">
            <div className="confirmations-header__stat-card">
              <div className="confirmations-header__stat-icon">
                <i className="bx bx-receipt"></i>
              </div>
              <div className="confirmations-header__stat-info">
                <span className="confirmations-header__stat-label">Formularios</span>
                <span className="confirmations-header__stat-value">{totalRegistros}</span>
              </div>
            </div>

            <div className="confirmations-header__stat-card">
              <div className="confirmations-header__stat-icon">
                <i className="bx bx-user"></i>
              </div>
              <div className="confirmations-header__stat-info">
                <span className="confirmations-header__stat-label">Adultos</span>
                <span className="confirmations-header__stat-value">{totalAdults}</span>
              </div>
            </div>

            <div className="confirmations-header__stat-card">
              <div className="confirmations-header__stat-icon">
                <i className="bx bx-smile"></i>
              </div>
              <div className="confirmations-header__stat-info">
                <span className="confirmations-header__stat-label">Niños</span>
                <span className="confirmations-header__stat-value">{totalKids}</span>
              </div>
            </div>

            <div className="confirmations-header__stat-card">
              <div className="confirmations-header__stat-icon">
                <i className="bx bx-group"></i>
              </div>
              <div className="confirmations-header__stat-info">
                <span className="confirmations-header__stat-label">Total Asistentes</span>
                <span className="confirmations-header__stat-value">{totalPeople}</span>
              </div>
            </div>

            <div className="confirmations-header__stat-card">
              <div className="confirmations-header__stat-icon">
                <i className="bx bx-calculator"></i>
              </div>
              <div className="confirmations-header__stat-info">
                <span className="confirmations-header__stat-label">Promedio / Reg.</span>
                <span className="confirmations-header__stat-value">{avgPerRegistration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

ConfirmationsHeader.propTypes = {
  event: PropTypes.object,
  totalRegistros: PropTypes.number,
  totalPeople: PropTypes.number,
  totalAdults: PropTypes.number,
  totalKids: PropTypes.number,
};
