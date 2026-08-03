import PropTypes from "prop-types";
import { useUI } from "../../../hooks"

export const LayoutModal = ({ children, title = 'Titulo del modal', modalName = '', isLarge = false}) => {

  const { closeModal } = useUI();

  return (
    <div className="layout-modal animate__animated animate__fadeIn">
      <div className={`layout-modal__container ${isLarge ? 'layout-modal__container--large' : ''}`}>
        <header className="layout-modal__header">
          <h2 className="layout-modal__title">{ title }</h2>
          <i onClick={ () => closeModal( modalName )} className='bx bx-x layout-modal__icon'></i>
        </header>
        <div className="layout-modal__content">
          { children }
        </div>
      </div>
    </div>
  )
}

LayoutModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  modalName: PropTypes.string,
  isLarge: PropTypes.bool,
};

