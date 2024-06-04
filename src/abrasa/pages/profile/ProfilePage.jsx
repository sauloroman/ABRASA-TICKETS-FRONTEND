import { useEffect } from "react";
import { useProfile } from "../../hooks/useProfile"
import { LayoutAbrasa } from "../../layout/abrasa/LayoutAbrasa"
import { useAuthentication } from "../../../auth/hooks";
import { ModalProfile, ProfileCover, ProfileHeader, ProfileInformation, ProfileSocial } from "./components";
import { useUI } from "../../../hooks";

export const ProfilePage = () => {

  const { user } = useAuthentication();
  const { getProfile, profile } = useProfile();
  const { profilePageModal: { isOpen } } = useUI();

  useEffect( () => {
    const profileId = user?.profile;
    getProfile( profileId );
  }, [] );

  return (
    <LayoutAbrasa>
      <section className="profile">

        <ProfileCover profile={ profile } />
        
        <div className="profile__container">

          <ProfileHeader profile={ profile } />

          <div className="profile__grid">
            <ProfileInformation profile={ profile } />
            <ProfileSocial profile={ profile } />
          </div>

        </div>
        { isOpen && <ModalProfile />}
      </section>
    </LayoutAbrasa>
  )
}
