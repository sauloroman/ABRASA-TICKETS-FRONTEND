import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../../../../../auth/hooks';
import abrasaLogo from '../../../../../assets/img/favicon.png';
import { useProfile } from '../../../../hooks';
import { useUI } from '../../../../../hooks';

export const Navigation = () => {
  const { logoutUser } = useAuthentication();
  const { profile } = useProfile();
  const {
    openSlide,
    closeSlide,
    slide: { isOpen },
  } = useUI();

  return (
    <>
      <nav
        className={`${isOpen ? 'navigation__show' : 'navigation__hide'} navigation`}
      >
        <div className="navigation__bar">
          <div onClick={closeSlide} className="navigation__close">
            <i className="bx bx-chevron-left navigation__close-icon"></i>
          </div>
        </div>
        <figure className="navigation__figure">
          <span className="navigation__title">Abrasa</span>
          <img
            src={profile?.image ? profile?.image : abrasaLogo}
            alt="Abrasa logo"
            className="navigation__image"
          />
        </figure>

        <ul className="navigation__list">
          <li className="navigation__item">
            <i className="bx bx-calendar-event navigation__icon"></i>
            <NavLink
              className={({ isActive }) =>
                `navigation__link ${isActive && 'navigation__link--active'}`
              }
              to="/events"
            >
              Tus Eventos
            </NavLink>
          </li>
          <li className="navigation__item">
            <i className="bx bx-bar-chart-alt-2 navigation__icon"></i>
            <NavLink
              className={({ isActive }) =>
                `navigation__link ${isActive && 'navigation__link--active'}`
              }
              to="/stadistics"
            >
              Tus Estadísticas
            </NavLink>
          </li>
          <li className="navigation__item">
            <i className="bx bx-user navigation__icon"></i>
            <NavLink
              className={({ isActive }) =>
                `navigation__link ${isActive && 'navigation__link--active'}`
              }
              to="/"
            >
              Perfil
            </NavLink>
          </li>
          <li onClick={logoutUser} className="navigation__item">
            <i className="bx bx-log-out navigation__icon"></i>
            <p className="navigation__link">Salir de Abrasa</p>
          </li>
        </ul>
      </nav>
      <div onClick={openSlide} className="navigation__button">
        <i className="bx bx-menu navigation__button-icon"></i>
      </div>
    </>
  );
};
