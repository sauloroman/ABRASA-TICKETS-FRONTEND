import { Link } from 'react-router-dom';
import { useUI } from '../../hooks';

export const Alert = () => {
  const {
    alert: {
      contentAlert,
      type,
      link: { isLink, path },
    },
    closeAlert,
  } = useUI();

  return (
    <div className="alert animate__animated animate__fadeIn">
      <div className="alert__container">
        <header className="alert__header">
          {type === 'success' ? (
            <i className="bx bx-check-circle alert__icon alert__icon--success"></i>
          ) : (
            <i className="bx bx-x-circle alert__icon alert__icon--error"></i>
          )}
          <h2
            className={`alert__title ${
              type === 'success'
                ? 'alert__title--success'
                : 'alert__title--error'
            }`}
          >
            {type === 'success' ? 'Exito' : 'Error'}
          </h2>
        </header>
        <div className="alert__content">
          <p className="alert__text">{contentAlert}</p>
          {isLink ? (
            <Link
              onClick={closeAlert}
              to={path}
              className={`btn ${
                type === 'success' ? 'btn--success' : 'btn--error'
              }`}
            >
              Aceptar
            </Link>
          ) : (
            <button
              onClick={closeAlert}
              className={`btn ${
                type === 'success' ? 'btn--success' : 'btn--error'
              }`}
            >
              Aceptar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
