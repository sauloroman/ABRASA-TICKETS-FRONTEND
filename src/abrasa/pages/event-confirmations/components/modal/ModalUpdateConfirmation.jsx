import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useConfirmations } from '../../../../hooks';

export const ModalUpdateConfirmation = ({ confirmation, onClose, page = 1 }) => {
  const { id } = useParams();
  const { updateConfirmation } = useConfirmations();

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    adultsQuantity: 1,
    kidsQuantity: 0,
    willAttend: true,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (confirmation) {
      setFormState({
        firstName: confirmation.firstName || '',
        lastName: confirmation.lastName || '',
        phone: confirmation.phone || '',
        adultsQuantity: confirmation.adultsQuantity ?? 1,
        kidsQuantity: confirmation.kidsQuantity ?? 0,
        willAttend: confirmation.willAttend ?? true,
      });
    }
  }, [confirmation]);

  const onInputChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!formState.firstName.trim()) {
      setErrorMessage('El nombre es obligatorio');
      return;
    }
    if (!formState.lastName.trim()) {
      setErrorMessage('El apellido es obligatorio');
      return;
    }

    updateConfirmation(
      confirmation.id,
      {
        firstName: formState.firstName,
        lastName: formState.lastName,
        phone: formState.phone,
        adultsQuantity: Number(formState.adultsQuantity),
        kidsQuantity: Number(formState.kidsQuantity),
        willAttend: Boolean(formState.willAttend),
      },
      { eventId: id, page, limit: 30 }
    );

    onClose();
  };

  if (!confirmation) return null;

  return (
    <div className="confirmations-modal-overlay" onClick={onClose}>
      <div className="confirmations-modal confirmations-modal--edit" onClick={(e) => e.stopPropagation()}>
        <div className="confirmations-modal__header">
          <div className="confirmations-modal__icon-container confirmations-modal__icon-container--edit">
            <i className="bx bx-edit-alt"></i>
          </div>
          <div className="confirmations-modal__title-box">
            <h3>Editar Confirmación</h3>
            <span className="confirmations-modal__subtitle">Modificar datos del invitado</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="confirmations-modal__form">
          <div className="confirmations-modal__form-row">
            <div className="confirmations-modal__form-group">
              <label className="confirmations-modal__label">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={onInputChange}
                className="confirmations-modal__input"
                placeholder="Nombre"
                required
              />
            </div>

            <div className="confirmations-modal__form-group">
              <label className="confirmations-modal__label">Apellido</label>
              <input
                type="text"
                name="lastName"
                value={formState.lastName}
                onChange={onInputChange}
                className="confirmations-modal__input"
                placeholder="Apellido"
                required
              />
            </div>
          </div>

          <div className="confirmations-modal__form-group">
            <label className="confirmations-modal__label">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formState.phone}
              onChange={onInputChange}
              className="confirmations-modal__input"
              placeholder="Ej: 1234567890"
            />
          </div>

          <div className="confirmations-modal__form-row">
            <div className="confirmations-modal__form-group">
              <label className="confirmations-modal__label">Pases Adulto</label>
              <input
                type="number"
                name="adultsQuantity"
                value={formState.adultsQuantity}
                onChange={onInputChange}
                className="confirmations-modal__input"
                min="0"
              />
            </div>

            <div className="confirmations-modal__form-group">
              <label className="confirmations-modal__label">Pases Niños</label>
              <input
                type="number"
                name="kidsQuantity"
                value={formState.kidsQuantity}
                onChange={onInputChange}
                className="confirmations-modal__input"
                min="0"
              />
            </div>
          </div>

          <div className="confirmations-modal__form-group">
            <label className="confirmations-modal__label">Asistencia</label>
            <div className="confirmations-modal__radio-group">
              <label className="confirmations-modal__radio-label">
                <input
                  type="radio"
                  name="willAttend"
                  checked={formState.willAttend === true}
                  onChange={() => setFormState({ ...formState, willAttend: true })}
                />
                <span>Sí asistirá</span>
              </label>
              <label className="confirmations-modal__radio-label">
                <input
                  type="radio"
                  name="willAttend"
                  checked={formState.willAttend === false}
                  onChange={() => setFormState({ ...formState, willAttend: false })}
                />
                <span>No asistirá</span>
              </label>
            </div>
          </div>

          {errorMessage && formSubmitted && (
            <span className="confirmations-modal__error">{errorMessage}</span>
          )}

          <div className="confirmations-modal__footer">
            <button
              type="button"
              onClick={onClose}
              className="confirmations-modal__btn confirmations-modal__btn--cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="confirmations-modal__btn confirmations-modal__btn--save"
            >
              <i className="bx bx-save"></i> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ModalUpdateConfirmation.propTypes = {
  confirmation: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  page: PropTypes.number,
};
