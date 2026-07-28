import PropTypes from 'prop-types';
import { useUI } from '../../../../hooks';

export const ConfirmationsStats = ({
  totalRegistros = 0,
  totalPeople = 0,
  totalAdults = 0,
  totalKids = 0,
}) => {
  const { openModal } = useUI();
  const avgPerRegistration = totalRegistros > 0 ? (totalPeople / totalRegistros).toFixed(1) : '0';

  const handleOpenModal = () => {
    openModal('confirmationsPageModal', 'createConfirmation');
  };

  return (
    <div className="confirmations-stats">
      <h2 className="confirmations-stats__title">
        <div className="confirmations-stats__icon">
          <i className="bx bx-stats confirmations-stats__icon-element"></i>
        </div>
        Estadísticas
      </h2>

      <div className="confirmations-stats__container">
        <p className="confirmations-stats__stat-main">
          Formularios Confirmados: <span>{totalRegistros}</span>
        </p>

        <div className="confirmations-stats__box">
          <h3 className="confirmations-stats__subtitle">Asistencia Confirmada</h3>
          <div className="confirmations-stats__info">
            <div className="confirmations-stats__stat">
              Adultos <span>{totalAdults}</span>
            </div>
            <div className="confirmations-stats__stat">
              Niños <span>{totalKids}</span>
            </div>
            <div className="confirmations-stats__stat">
              Total <span>{totalPeople}</span>
            </div>
          </div>
        </div>

        <div className="confirmations-stats__box confirmations-stats__box--avg">
          <p className="confirmations-stats__stat-main confirmations-stats__stat-main--avg">
            Promedio por Registro: <span>{avgPerRegistration}</span>
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="confirmations-stats__add-btn btn btn--black"
        >
          <i className="bx bx-user-plus"></i> Registrar Confirmación
        </button>
      </div>
    </div>
  );
};

ConfirmationsStats.propTypes = {
  totalRegistros: PropTypes.number,
  totalPeople: PropTypes.number,
  totalAdults: PropTypes.number,
  totalKids: PropTypes.number,
};
