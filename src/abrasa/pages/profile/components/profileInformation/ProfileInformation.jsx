import { useUI } from '../../../../../hooks';
import logo from  '../../../../../assets/img/logo-light.png';

export const ProfileInformation = ({ profile }) => {

  const { openModal } = useUI();

  const onOpenModal = () => {
    openModal('profilePageModal', 'editInformation');
  }

  return (
    <section className="profile-information">
      <header className="profile-information__header">
        <h3 className="profile-information__header-title">Información del perfil</h3>
        <div className="profile-information__header-box">
          <button onClick={ onOpenModal } className="profile-information__header-button btn btn--outline">
            <i className="bx bx-edit-alt profile-information__header-icon"></i>
            Editar información
          </button>
        </div>
      </header>
      <div className="profile-information__user">
        <h4 className="profile-information__sectionTitle">Usuario</h4>

        <div className="profile-information__grid profile-information__grid--1">
          <div className="profile-information__item">
            <p className="profile-information__item-title">Nombre Completo</p>
            <p className="profile-information__item-value">{ profile?.user.name }</p>
          </div>
          <div className="profile-information__item">
            <p className="profile-information__item-title">Correo electrónico</p>
            <p className="profile-information__item-value">{ profile?.user.email }</p>
          </div>
          <div className="profile-information__item">
            <p className="profile-information__item-title">Fecha de creación</p>
            <p className="profile-information__item-value">{ profile?.user.createdAt.split(',')[0] }</p>
          </div>
          <div className="profile-information__item">
            <p className="profile-information__item-title">Hora de creación</p>
            <p className="profile-information__item-value">{ profile?.user.createdAt.split(',')[1] }</p>
          </div>
        </div>
      </div>
      <div className="profile-information__contact">
        <h4 className="profile-information__sectionTitle">Contacto</h4>

        <div className="profile-information__grid profile-information__grid--1">
          <div className="profile-information__item">
            <p className="profile-information__item-title">Dirección</p>
            <p className="profile-information__item-value">{ profile?.address }</p>
          </div>
          <div className="profile-information__item">
            <p className="profile-information__item-title">Ciudad</p>
            <p className="profile-information__item-value">{ profile?.location }</p>
          </div>
          <div className="profile-information__item">
            <p className="profile-information__item-title">Teléfono</p>
            <p className="profile-information__item-value">{ profile?.phone }</p>
          </div>
        </div>
      </div>
      <div className="profile-information__logo">
        <img src={logo} alt="Logo Abrasa" />
      </div>
    </section>
  );
};
