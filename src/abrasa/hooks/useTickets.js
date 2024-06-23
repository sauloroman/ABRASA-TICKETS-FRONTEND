import { useDispatch, useSelector } from 'react-redux';
import {
  startCreatingTicket,
  startDeletingAllTicketsOfEvent,
  startDeletingTicketById,
  startGettingAllTickets,
  startGettingTicketById,
  startGettingTicketsOfEvent,
  startUpdatingTicket,
} from '../../store/abrasa/tickets/tickets.thunks';
import {
  setPage,
  setTotalPages,
} from '../../store/abrasa/tickets/tickets.slice';

export const useTickets = () => {
  const dispatch = useDispatch();

  const { tickets, page, total, totalPages, totalAdults, totalKids } = useSelector((store) => store.tickets);

  const getAllTickets = () => {
    dispatch( startGettingAllTickets() );
  }

  const getTicketsByEvent = (config = {}) => {
    dispatch(startGettingTicketsOfEvent(config));
  };

  const getTicketById = (ticketID = '') => {
    const ticket = dispatch(startGettingTicketById(ticketID));
    return ticket;
  };

  const createTicket = (ticketInformation = {}, config = {}) => {
    dispatch(startCreatingTicket(ticketInformation, config));
  };

  const deleteTicket = (ticketID = '', config = {}) => {
    dispatch(startDeletingTicketById(ticketID, config));
  };

  const deleteAllTicketsOfEvent = (eventID = '', config) => {
    dispatch(startDeletingAllTicketsOfEvent(eventID, config));
  };

  const updateTicket = (
    ticketID = '',
    newTicketInformation = {},
    config = {}
  ) => {
    dispatch(startUpdatingTicket(ticketID, newTicketInformation, config));
  };

  const nextPage = () => {
    dispatch(setPage(page + 1));
  };

  const prevPage = () => {
    if (page === 1) return;
    dispatch(setPage(page - 1));
  };

  const getTotalPages = () => {
    let numberPages = 0;
    numberPages = Math.ceil(total / 15);
    dispatch(setTotalPages(numberPages));
  };

  return {
    tickets,
    page,
    total,
    totalPages,
    totalAdults,
    totalKids,

    // METHODS
    getAllTickets,
    getTicketsByEvent,
    getTicketById,
    createTicket,
    deleteTicket,
    deleteAllTicketsOfEvent,
    updateTicket,
    nextPage,
    prevPage,
    getTotalPages,
  };
};
