import { useUI } from "../../../../../hooks";

export const ProfileSocial = ({ profile }) => {

  const { openModal } = useUI();

  const onOpenModal = () => {
    openModal('profilePageModal', 'editSocial');
  }


  return (
    <section className="profile-social">
      <header className="profile-social__header">
        <h3 className="profile-social__header-title">Sociales</h3>
        <button onClick={ onOpenModal } className="profile-social__header-button btn btn--outline">
          <i className="bx bx-edit-alt profile-information__header-icon"></i>
          Editar sociales
        </button>
      </header>

      <div className="profile-social__section">
        <h4 className="profile-social__sectionTitle">Biografía <span>(120 caracteres)</span></h4>
        <div className="profile-social__item profile-social__item--bio">
          <p className="profile-social__bio">{ profile?.bio }</p>
        </div>
      </div>

      <div className="profile-social__section">
        <h4 className="profile-social__sectionTitle">Redes</h4>
        <div className="profile-social__grid">
          
          <a href={`${ profile?.website}`} target="_blank" className="profile-social__item">
            <div className="profile-social__item-image">
              <i className='bx bx-world profile-social__item-icon' ></i>
            </div>
            <p className="profile-social__item-name">www.paginauser.com</p>
          </a>

          <a href={`${ profile?.facebook}`} target="_blank" className="profile-social__item">
            <div className="profile-social__item-image">
              <i className='bx bxl-facebook profile-social__item-icon' ></i>
            </div>
            <p className="profile-social__item-name">Tu página de Facebook</p>
          </a>

          <a href={`${ profile?.instagram}`} target="_blank" className="profile-social__item">
            <div className="profile-social__item-image">
              <i className='bx bxl-instagram profile-social__item-icon' ></i>
            </div>
            <p className="profile-social__item-name">Tu página de Instagram</p>
          </a>

          <a href={`${ profile?.tiktok}`} target="_blank" className="profile-social__item">
            <div className="profile-social__item-image">
              <i className='bx bxl-tiktok profile-social__item-icon' ></i>
            </div>
            <p className="profile-social__item-name">Tu página de TikTok</p>
          </a>

        </div>
      </div>

    </section>
  )
}
