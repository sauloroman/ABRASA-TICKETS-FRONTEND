import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useConfirmations } from '../../../hooks';
import { useAuthentication } from '../../../../auth/hooks';
import { formatDate, formatWhatsappLink } from '../helpers/confirmationsHelpers';

export const ConfirmationsTable = ({
  confirmations = [],
  isLoading = false,
  page = 1,
  totalPages = 1,
  total = 0,
  onNextPage,
  onPrevPage,
  onDeleteConfirmation,
  eventName = 'evento',
}) => {
  const { id } = useParams();
  const { getConfirmationsByEvent, isExportingPdf, exportConfirmationsPdf } = useConfirmations();
  const { user } = useAuthentication();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (id) {
        getConfirmationsByEvent({
          eventId: id,
          page: page || 1,
          limit: 30,
          name: searchTerm,
        });
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, id, page]);

  const handleConfirmDelete = () => {
    if (selectedToDelete) {
      onDeleteConfirmation(selectedToDelete.id);
      setSelectedToDelete(null);
    }
  };

  const handleExportPDF = () => {
    if (!id) return;
    exportConfirmationsPdf({ eventId: id, eventName });
  };

  return (
    <div className="confirmations-table-container">
      <div className="confirmations-table__search-bar">
        <div className="confirmations-table__search-input-wrapper">
          <i className="bx bx-search-alt-2 confirmations-table__search-icon"></i>
          <input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="confirmations-table__search-input"
          />
          {isLoading && (
            <i className="bx bx-loader-alt bx-spin confirmations-table__search-spinner"></i>
          )}
          {searchTerm && !isLoading && (
            <button
              onClick={() => setSearchTerm('')}
              className="confirmations-table__search-clear"
              title="Limpiar búsqueda"
            >
              <i className="bx bx-x"></i>
            </button>
          )}
        </div>

        <div className="confirmations-table__search-actions">
          <span className="confirmations-table__counter-badge">
            <i className="bx bx-user-check"></i> {total} {total === 1 ? 'registro' : 'registros'}
          </span>
          <button
            onClick={handleExportPDF}
            disabled={total === 0 || isExportingPdf}
            className="btn btn--outline confirmations-table__export-btn"
            title="Exportar confirmaciones a PDF"
          >
            <i className={`bx ${isExportingPdf ? 'bx-loader-alt bx-spin' : 'bxs-file-pdf'}`}></i>{' '}
            {isExportingPdf ? 'Generando PDF...' : 'Exportar PDF'}
          </button>
        </div>
      </div>

      <div className="confirmations-table__wrapper">
        {isLoading ? (
          <div className="confirmations-table__loading">
            <i className="bx bx-loader-alt bx-spin"></i>
            <p>Cargando confirmaciones...</p>
          </div>
        ) : confirmations.length === 0 ? (
          <div className="confirmations-table__empty">
            <i className="bx bx-receipt"></i>
            <h3>No se encontraron confirmaciones</h3>
            <p>No hay registros que coincidan con la búsqueda o el evento aún no cuenta con confirmaciones.</p>
          </div>
        ) : (
          <table className="confirmations-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre Completo</th>
                <th>Teléfono</th>
                <th>Asistencia</th>
                <th>Adultos</th>
                <th>Niños</th>
                <th>Total</th>
                <th>Fecha Registro</th>
                {user?.role !== 'Cliente' && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {confirmations.map((item, index) => {
                const totalGuest = (item.adultsQuantity || 0) + (item.kidsQuantity || 0);
                return (
                  <tr key={item.id || index}>
                    <td className="confirmations-table__index">{(page - 1) * 30 + index + 1}</td>
                    <td className="confirmations-table__name">
                      <div className="confirmations-table__user-info">
                        <strong>
                          {item.firstName} {item.lastName}
                        </strong>
                      </div>
                    </td>
                    <td className="confirmations-table__phone">
                      {item.phone ? (
                        <a
                          href={formatWhatsappLink(item.phone)}
                          target="_blank"
                          rel="noreferrer"
                          className="confirmations-table__wa-link"
                          title="Enviar mensaje por WhatsApp"
                        >
                          <i className="bx bxl-whatsapp"></i> {item.phone}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>
                      {item.willAttend ? (
                        <span className="confirmations-table__badge-attend confirmations-table__badge-attend--yes">
                          Sí asistirá
                        </span>
                      ) : (
                        <span className="confirmations-table__badge-attend confirmations-table__badge-attend--no">
                          No asistirá
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="confirmations-table__badge confirmations-table__badge--adults">
                        {item.adultsQuantity || 0}
                      </span>
                    </td>
                    <td>
                      <span className="confirmations-table__badge confirmations-table__badge--kids">
                        {item.kidsQuantity || 0}
                      </span>
                    </td>
                    <td>
                      <span className="confirmations-table__badge confirmations-table__badge--total">
                        {totalGuest}
                      </span>
                    </td>
                    <td className="confirmations-table__date">{formatDate(item.registrationDate)}</td>
                    {user?.role !== 'Cliente' && (
                      <td className="confirmations-table__actions-cell">
                        <button
                          onClick={() => setSelectedToDelete(item)}
                          className="confirmations-table__action-btn confirmations-table__action-btn--delete"
                          title="Eliminar confirmación"
                        >
                          <i className="bx bx-trash"></i>
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {confirmations.length > 0 && (
        <div className="events-pagination">
          <div className="events-pagination__pages">
            <div 
              onClick={onPrevPage}
              className={`events-pagination__button ${page === 1 && 'hide-element'}`}
            >
              <i className="bx bx-chevron-left events-pagination__icon"></i>
            </div>
            <p className="events-pagination__number">{page}</p>
            <div 
              onClick={onNextPage}
              className={`events-pagination__button ${(totalPages === 1 || page === totalPages) && 'hide-element'}`}
            >
              <i className="bx bx-chevron-right events-pagination__icon"></i>
            </div>
          </div>
        </div>
      )}

      {selectedToDelete && (
        <div className="confirmations-modal-overlay">
          <div className="confirmations-modal">
            <div className="confirmations-modal__header">
              <i className="bx bx-error-circle"></i>
              <h3>¿Eliminar Confirmación?</h3>
            </div>
            <p className="confirmations-modal__message">
              ¿Estás seguro de que deseas eliminar la confirmación de{' '}
              <strong>
                {selectedToDelete.firstName} {selectedToDelete.lastName}
              </strong>
              ? Esta acción no se puede deshacer.
            </p>
            <div className="confirmations-modal__buttons">
              <button
                onClick={() => setSelectedToDelete(null)}
                className="btn btn--outline confirmations-modal__btn"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn btn--red confirmations-modal__btn"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ConfirmationsTable.propTypes = {
  confirmations: PropTypes.array,
  isLoading: PropTypes.bool,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  total: PropTypes.number,
  onNextPage: PropTypes.func,
  onPrevPage: PropTypes.func,
  onDeleteConfirmation: PropTypes.func,
  eventName: PropTypes.string,
};
