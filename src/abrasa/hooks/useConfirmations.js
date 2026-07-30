import { useDispatch, useSelector } from 'react-redux';
import {
  startCreatingConfirmation,
  startDeletingConfirmationById,
  startUpdatingConfirmationById,
  startExportingConfirmationsPdf,
  startGettingConfirmationsByEvent,
} from '../../store/abrasa/confirmations/confirmations.thunks';
import { setPage } from '../../store/abrasa/confirmations/confirmations.slice';

export const useConfirmations = () => {
  const dispatch = useDispatch();

  const {
    confirmations,
    page,
    limit,
    total,
    totalPages,
    totalAdults,
    totalKids,
    totalPeople,
    isLoading,
    isExportingPdf,
  } = useSelector((store) => store.confirmations);

  const getConfirmationsByEvent = ({ eventId = '', page: reqPage = 1, limit: reqLimit = 30, name: reqName = '' }) => {
    dispatch(startGettingConfirmationsByEvent({ eventId, page: reqPage, limit: reqLimit, name: reqName }));
  };

  const createConfirmation = (confirmationData = {}, config = {}) => {
    dispatch(startCreatingConfirmation(confirmationData, config));
  };

  const deleteConfirmation = (confirmationId = '', config = {}) => {
    dispatch(startDeletingConfirmationById(confirmationId, config));
  };

  const updateConfirmation = (confirmationId = '', confirmationData = {}, config = {}) => {
    dispatch(startUpdatingConfirmationById(confirmationId, confirmationData, config));
  };

  const exportConfirmationsPdf = ({ eventId = '', eventName = 'evento' }) => {
    dispatch(startExportingConfirmationsPdf({ eventId, eventName }));
  };

  const nextPage = () => {
    if (page >= totalPages) return;
    dispatch(setPage(page + 1));
  };

  const prevPage = () => {
    if (page === 1) return;
    dispatch(setPage(page - 1));
  };

  return {
    confirmations,
    page,
    limit,
    total,
    totalPages,
    totalAdults,
    totalKids,
    totalPeople,
    isLoading,
    isExportingPdf,

    // METHODS
    getConfirmationsByEvent,
    createConfirmation,
    deleteConfirmation,
    updateConfirmation,
    exportConfirmationsPdf,
    nextPage,
    prevPage,
  };
};
