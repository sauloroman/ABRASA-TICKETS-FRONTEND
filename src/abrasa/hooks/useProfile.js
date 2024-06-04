import { useDispatch, useSelector } from "react-redux"
import { startGettingProfile, startUpdateingProfile, startUploadingPhoto } from "../../store/abrasa/profile/profile.thunks";

export const useProfile = () => {

  const { profile } = useSelector( store => store.profile );
  const dispatch = useDispatch();

  const getProfile = ( id ) => {
    dispatch( startGettingProfile( id ) );
  }

  const updateProfile = ( id, newProfileInformation ) => {
    dispatch( startUpdateingProfile( id, newProfileInformation ) );
  }

  const updateProfilePhotos = ( id, file, property ) => {
    dispatch(startUploadingPhoto(id, file, property));
  }

  return {
    profile,
    
    // METHODS
    getProfile,
    updateProfile,
    updateProfilePhotos
  }

}