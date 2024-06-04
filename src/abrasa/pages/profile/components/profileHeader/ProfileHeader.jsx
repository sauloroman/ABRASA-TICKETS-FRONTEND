import { useUI } from "../../../../../hooks";

export const ProfileHeader = ({ profile }) => {

  const image = profile?.image ?? null;
  const { openModal } = useUI();

  const onOpenModalProfile = () => {
    openModal('profilePageModal', 'editPhotoProfile');
  }

  const onOpenModalCover= () => {
    openModal('profilePageModal', 'editPhotoCover');
  }


  return (
    <header className="profile-header">
      <div className="profile-header__box">
        <figure className="profile-header__figure">
          {
            image 
            ? ( <img src={profile?.image} alt="User image" /> )
            : ( 
              <div className="profile-header__default">
                <p>{ profile?.user.name[0] }</p>
              </div> 
            )
          }
        
        </figure>
        <div className="profile-header__info">
          <h1 className="profile-header__title">{profile?.user.name}</h1>
          <p className="profile-header__profession">{ profile?.profession }</p>
        </div>
      </div>

      <div className="profile-header__buttons">
        <button onClick={ onOpenModalProfile } className="profile-header__button btn btn--outline">
          <i className="bx bx-user-circle profile-header__icon"></i>
          Perfil
        </button>
        <button onClick={ onOpenModalCover } className="profile-header__button btn btn--outline">
          <i className="bx bx-image profile-header__icon"></i>
          Portada
        </button>
      </div>
    </header>
  );
};
