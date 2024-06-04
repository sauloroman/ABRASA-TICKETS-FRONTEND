import abrasaApi from '../../../config/api/abrasaApi';
import { setAlert, setIsLoading } from '../../ui/ui.slice';
import {
  setPage,
  setTicketTarget,
  setTickets,
  setTotal,
  setTotalAdults,
  setTotalKids,
} from './tickets.slice';

export const startGettingTicketsOfEvent = ({
  eventID = '',
  page: pageUser,
  limit: limitUser,
}) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await abrasaApi.get(
        `/tickets/event/${eventID}?page=${pageUser}&limit=${limitUser}`
      );
      const { total, page, tickets, adultsQuantity, kidsQuantity } = data;

      dispatch(setTickets(tickets));
      dispatch(setPage(page));
      dispatch(setTotal(total));
      dispatch(setTotalAdults(adultsQuantity));
      dispatch(setTotalKids(kidsQuantity));
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: 'No se pudo obtener los boletos. Intente nuevamente',
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startDeletingAllTicketsOfEvent = (
  id = '',
  { eventID, page: pageUser, limit: limitUser }
) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      await abrasaApi.delete(`/tickets/event/${id}`);

      const { data } = await abrasaApi.get(
        `/tickets/event/${eventID}?page=${pageUser}&limit=${limitUser}`
      );

      const { total, page, tickets, adultsQuantity, kidsQuantity } = data;

      dispatch(setTickets(tickets));
      dispatch(setPage(page));
      dispatch(setTotal(total));
      dispatch(setTotalAdults(adultsQuantity));
      dispatch(setTotalKids(kidsQuantity));

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: 'Boletos eliminados correctamente',
          type: 'success',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: 'No se pudo eliminar los boletos del evento.',
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startCreatingTicket = (
  ticketInformation = {},
  { eventID = '', page: pageUser = 1, limit: limitUser = 15 }
) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      await abrasaApi.post('/tickets', ticketInformation);

      const { data } = await abrasaApi.get(
        `/tickets/event/${eventID}?page=${pageUser}&limit=${limitUser}`
      );
      const { total, page, tickets, adultsQuantity, kidsQuantity } = data;

      dispatch(setTickets(tickets));
      dispatch(setPage(page));
      dispatch(setTotal(total));
      dispatch(setTotalAdults(adultsQuantity));
      dispatch(setTotalKids(kidsQuantity));

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: 'Boleto creado correctamente',
          type: 'success',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    } catch (error) {
      console.log(error);
      const { error: errorMessage } = error.response.data;

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: errorMessage,
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startGettingTicketById = (ticketID = '') => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { data: ticket } = await abrasaApi.get(`/tickets/${ticketID}`);
      dispatch(setTicketTarget(ticket));
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert:
            'No se pudo obtener el boleto. Intente nuevamente más tarde',
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startUpdatingScannedTicket = (
  ticketID = '',
  ticketInformation = {}
) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const {
        data: { ticket, msg },
      } = await abrasaApi.put(`/tickets/scan/${ticketID}`, ticketInformation);

      dispatch(setTicketTarget(ticket));

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: msg,
          type: 'success',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    } catch (error) {
      console.log(error);

      const errorMessage = error.response.data.error;

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: errorMessage,
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startDeletingTicketById = (
  ticketID = '',
  { eventID = '', page: pageUser = 1, limit: limitUser = 15 }
) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const {
        data: { msg },
      } = await abrasaApi.delete(`/tickets/${ticketID}`);
      const { data } = await abrasaApi.get(
        `/tickets/event/${eventID}?page=${pageUser}&limit=${limitUser}`
      );
      const { total, page, tickets, adultsQuantity, kidsQuantity } = data;

      dispatch(setTickets(tickets));
      dispatch(setPage(page));
      dispatch(setTotal(total));
      dispatch(setTotalAdults(adultsQuantity));
      dispatch(setTotalKids(kidsQuantity));

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: msg,
          type: 'success',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: 'No se eliminó el boleto. Intente nuevamente más tarde',
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};

export const startUpdatingTicket = (
  ticketID = '',
  newTicketInformation = {},
  { eventID = '', page: pageUser = 1, limit: limitUser = 15 }
) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const {
        data: { msg },
      } = await abrasaApi.put(`/tickets/${ticketID}`, newTicketInformation);
      const { data } = await abrasaApi.get(
        `/tickets/event/${eventID}?page=${pageUser}&limit=${limitUser}`
      );
      const { total, page, tickets, adultsQuantity, kidsQuantity } = data;

      dispatch(setTickets(tickets));
      dispatch(setPage(page));
      dispatch(setTotal(total));
      dispatch(setTotalAdults(adultsQuantity));
      dispatch(setTotalKids(kidsQuantity));

      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert: msg,
          type: 'success',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          isAlertOpen: true,
          contentAlert:
            'No se actualizó el boleto. Intente nuevamente más tarde',
          type: 'error',
          link: {
            isLink: false,
            path: '',
          },
        })
      );
    }

    dispatch(setIsLoading(false));
  };
};
