import { useDispatch, useSelector } from 'react-redux';
import {
  startGettingTicketById,
  startUpdatingScannedTicket,
} from '../../store/abrasa/tickets/tickets.thunks';
import { setTicketTarget } from '../../store/abrasa/tickets/tickets.slice';

export const useScanTicket = () => {
  const dispatch = useDispatch();
  const { ticketTarget } = useSelector((store) => store.tickets);

  const getTicketScanned = (ticketID = '') => {
    dispatch(startGettingTicketById(ticketID));
  };

  const updateTicketScanned = (ticketID = '', ticketInformation = {}) => {
    return dispatch(startUpdatingScannedTicket(ticketID, ticketInformation));
  };

  const resetTicketScanned = () => {
    dispatch(setTicketTarget({}))
  }

  return {
    ticketScanned: ticketTarget,
    getTicketScanned,
    updateTicketScanned,
    resetTicketScanned
  };
};
