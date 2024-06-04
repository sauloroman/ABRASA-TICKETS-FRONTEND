import abrasaApi from "../../../config/api/abrasaApi";
import { setAlert, setIsLoading } from "../../ui/ui.slice"
import { setEvent, setEvents, setPage, setTotal } from "./events.slice";

export const startGettingEventsOfUser = ( {userID = '', page: reqPage, limit: reqLimit, category = 'todos'} ) => {
  return async ( dispatch ) => {

    dispatch( setIsLoading(true) );

    try {

      const { data } = await abrasaApi.get(`/events/${userID}?page=${reqPage}&limit=${reqLimit}&category=${category}`);

      const { page, events, total } = data;

      dispatch( setEvents( events ) );
      dispatch( setPage(page) );
      dispatch( setTotal(total) );

    } catch (error) { 
      console.log(error);
    }

    dispatch( setIsLoading(false) );

  }
}

export const startCreatingEvent = ( event = {}, { userID = '', page: reqPage, limit: reqLimit, category = 'todos'} ) => {
  return async ( dispatch ) => {

    dispatch( setIsLoading(true) );

    try {

      await abrasaApi.post('/events', event );
      const { data } = await abrasaApi.get(`/events/${userID}?page=${reqPage}&limit=${reqLimit}&category=${category}`);
      const { page, events, total } = data;
      dispatch( setEvents( events ) );
      dispatch( setPage(page) );
      dispatch( setTotal(total) );


      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'Evento creado exitosamente',
        type: 'success',
        link: {
          isLink: true,
          path: '/events',
        }
      }));
        
    } catch (error) { 
      console.log(error);
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'No fue posible crear el evento',
        type: 'error',
        link: {
          isLink: false,
          path: '',
        }
      }));
    }

    dispatch( setIsLoading(false) );

  }
}

export const startDeletingEventById = ( eventID = '', { userID = '', page: reqPage, limit: reqLimit, category = 'todos'} ) => {
  return async ( dispatch ) => {

    dispatch( setIsLoading( true ));

    try {
      
      const { data: { msg } } = await abrasaApi.delete(`/events/${eventID}`);
      const { data } = await abrasaApi.get(`/events/${userID}?page=${reqPage}&limit=${reqLimit}&category=${category}`);
      const { page, events, total } = data;
      dispatch( setEvents( events ) );
      dispatch( setPage(page) );
      dispatch( setTotal(total) );

      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: msg,
        type: 'success',
        link: {
          isLink: false,
          path: '',
        }
      }));

    } catch (error) {
      console.log(error);
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'No fue posible eliminar el evento',
        type: 'error',
        link: {
          isLink: false,
          path: '',
        }
      }));
    }

    dispatch( setIsLoading( false ));

  }
}

export const startGettingEventById = ( eventID = '' ) => {
  return async ( dispatch ) => {
    dispatch( setIsLoading(true) );

    try {

      const { data: event } = await abrasaApi.get(`/events/event/${eventID}`);
      dispatch( setEvent( event ) );

    } catch (error) { 
      console.log(error);
    }

    dispatch( setIsLoading(false) );
  }
}

export const startUpdatingEventById = ( eventID = '', newEventInformation = {} ) => {
  return async ( dispatch ) => {

    dispatch( setIsLoading(true) );

    try {

      const { data: eventUpdated } = await abrasaApi.put(`/events/${eventID}`, newEventInformation );
      
      dispatch( setEvent( eventUpdated ) );

      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'Evento actualizado exitosamente',
        type: 'success',
        link: {
          isLink: false,
          path: '',
        }
      }));

    } catch (error) {
      console.log(error);
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'No fue posible actualizar el evento',
        type: 'error',
        link: {
          isLink: false,
          path: '',
        }
      }));
    }

    dispatch( setIsLoading(false) );

  }
}

export const startUpdatingEventPhoto = ( file = {}, eventID = '' ) => {
  return async ( dispatch ) => {

    dispatch( setIsLoading(true) );

    try {

      const { data: eventUpdated } = await abrasaApi.put(`/events/upload/cloud/${eventID}`, file );
      
      dispatch( setEvent( eventUpdated ) );

      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'Imagen actualizada exitosamente',
        type: 'success',
        link: {
          isLink: false,
          path: '',
        }
      }));

    } catch (error) {
      console.log(error);
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'No fue posible actualizar la imagen del evento',
        type: 'error',
        link: {
          isLink: false,
          path: '',
        }
      }));
    }

    dispatch( setIsLoading(false) );


  }
}