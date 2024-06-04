import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCloseModal, setOpenModal, setSlide } from "../store/ui/ui.slice";

export const useUI = () => {

  const dispatch = useDispatch();
  const { isLoading, alert, modal, slide } = useSelector( store => store.ui );

  const showAlert = ( contentAlert = '' ) => {
    dispatch( setAlert({ isAlertOpen: true, contentAlert, type: 'success'}) )
  }

  const closeAlert = () => {
    dispatch( setAlert({ isAlertOpen: false, contentAlert: '', type: 'error'}) );
  }

  const openModal = ( modalName = '', selectedModal = '', data = '' ) => {
    dispatch( setOpenModal({ modalName, selectedModal, data }) );
  }

  const closeModal = ( modalName = '' ) => {
    dispatch( setCloseModal({ modalName }) );
  }

  const openSlide = () => {
    dispatch( setSlide( true ) );
  }

  const closeSlide = () => {
    dispatch( setSlide( false ) );
  }

  return {
    ...modal,
    isLoading,
    alert,
    slide,

    // METHODS
    showAlert,
    closeAlert,
    openModal,
    closeModal,
    openSlide,
    closeSlide,
  }

}