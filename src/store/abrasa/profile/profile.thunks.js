import abrasaApi from "../../../config/api/abrasaApi";
import { setAlert, setIsLoading } from "../../ui/ui.slice"
import { setProfile } from "./profile.slice";

export const startGettingProfile = ( id = '' ) => {
  return async ( dispatch ) => {

    dispatch( setIsLoading( true ) ) ;

    try {
      const { data: profile } = await abrasaApi.get(`/profile/${id}`);
      dispatch( setProfile( profile ) );

    } catch (error) {
      console.log(error);
    }

    dispatch( setIsLoading( false ) ) ;

  }
}

export const startUpdateingProfile = ( profileId, newProfileInformation = {} ) => {
  return async ( dispatch ) => {

    dispatch( setIsLoading( true ) );

    try {

      const { data: profile } = await  abrasaApi.put(`/profile/${ profileId }`, newProfileInformation );
      dispatch( setProfile( profile ) );

      dispatch( setAlert({
        isAlertOpen: true,
        contentAlert: 'Cambios realizados exitosamente',
        type: 'success',
        link: {
          isLink: false,
          path: '',
        }
      }))

    } catch (error) {
      console.log(error);
    }

    dispatch( setIsLoading( false ) );

  }
}

export const startUploadingPhoto = ( profileId, file, property ) => {
  return async ( dispatch ) => {

    dispatch( setIsLoading( true ) );

    try {

      const { data: profile } = await abrasaApi.put(`/profile/upload/${property}/${profileId}`, file ); 
      
      dispatch( setProfile(profile) );

      dispatch( setAlert({
        isAlertOpen: true,
        contentAlert: `Foto de ${ property === 'image' ? 'perfil' : 'portada'} actualizada`,
        type: 'success',
        link: {
          isLink: false,
          path: '',
        }
      }))

    } catch (error) {
      console.log(`${error}`);
    }

    dispatch( setIsLoading( false ) );

  }
}