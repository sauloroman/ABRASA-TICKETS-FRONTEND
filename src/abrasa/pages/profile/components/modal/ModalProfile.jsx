import { useUI } from "../../../../../hooks"
import { LayoutModal } from "../../../../layout"
import { ModalEditInformation, ModalEditPhotoCover, ModalEditPhotoProfile, ModalEditSocial } from ".."

export const ModalProfile = () => {
  const { profilePageModal: { selectedModal } } = useUI();

  const titleModal = 
    (selectedModal === 'editInformation') ? 'Editar Información': 
    (selectedModal === 'editSocial') ? 'Editar sociales':
    (selectedModal === 'editPhotoProfile') ? 'Cambiar Foto de Perfil' : 'Cambiar Foto de Portada';

  return (
    <LayoutModal title={ titleModal } modalName="profilePageModal">
      { selectedModal === 'editSocial' && <ModalEditSocial />}
      { selectedModal === 'editInformation' && <ModalEditInformation />}
      { selectedModal === 'editPhotoProfile' && <ModalEditPhotoProfile />}
      { selectedModal === 'editPhotoCover' && <ModalEditPhotoCover />}
    </LayoutModal>
  )
}
