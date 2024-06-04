import { useDispatch, useSelector } from 'react-redux';
import {
  startGettingTicketById,
  startUpdatingScannedTicket,
} from '../../store/abrasa/tickets/tickets.thunks';

export const useScanTicket = () => {
  const dispatch = useDispatch();
  const { ticketTarget } = useSelector((store) => store.tickets);

  const getTicketScanned = (ticketID = '') => {
    dispatch(startGettingTicketById(ticketID));
  };

  const updateTicketScanned = (ticketID = '', ticketInformation = {}) => {
    dispatch(startUpdatingScannedTicket(ticketID, ticketInformation));
  };

  return {
    ticketScanned: ticketTarget,
    getTicketScanned,
    updateTicketScanned,
  };
};
