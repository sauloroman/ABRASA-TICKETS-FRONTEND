import abrasaApi from '../../../config/api/abrasaApi';
import { setAlert } from '../../ui/ui.slice';
import {
  setConfirmations,
  setStats,
  setIsLoadingConfirmations,
  setIsExportingPdf,
  setPage,
  setTotal,
  setTotalPages,
} from './confirmations.slice';

export const startGettingConfirmationsByEvent = ({ eventId = '', page = 1, limit = 30, name = '' }) => {
  return async (dispatch) => {
    if (!eventId) return;
    dispatch(setIsLoadingConfirmations(true));

    try {
      const nameParam = name ? `&name=${encodeURIComponent(name)}` : '';
      const { data } = await abrasaApi.get(`/open-confirmations/event/${eventId}?page=${page}&limit=${limit}${nameParam}`);
      const { confirmations = [], total = 0, page: resPage = 1 } = data;

      dispatch(setConfirmations(confirmations));
      dispatch(setPage(resPage));
      dispatch(setTotal(total));

      const numPages = Math.ceil(total / limit) || 1;
      dispatch(setTotalPages(numPages));

      const statsRes = await abrasaApi.get(`/open-confirmations/event/${eventId}/stats`);
      dispatch(setStats(statsRes.data));
    } catch (error) {
      console.log('Error al obtener confirmaciones y estadísticas:', error);
      dispatch(setConfirmations([]));
      dispatch(setTotal(0));
      dispatch(setTotalPages(1));
    }

    dispatch(setIsLoadingConfirmations(false));
  };
};

export const startDeletingConfirmationById = (confirmationId = '', { eventId = '', page = 1, limit = 30 }) => {
  return async (dispatch) => {
    dispatch(setIsLoadingConfirmations(true));

    try {
      await abrasaApi.delete(`/open-confirmations/${confirmationId}`);
      
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'Confirmación eliminada exitosamente',
        type: 'success',
        link: { isLink: false, path: '' }
      }));

      dispatch(startGettingConfirmationsByEvent({ eventId, page, limit }));
    } catch (error) {
      console.log('Error al eliminar confirmación:', error);
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'No fue posible eliminar la confirmación',
        type: 'error',
        link: { isLink: false, path: '' }
      }));
    }

    dispatch(setIsLoadingConfirmations(false));
  };
};

export const startUpdatingConfirmationById = (confirmationId = '', confirmationData = {}, { eventId = '', page = 1, limit = 30 }) => {
  return async (dispatch) => {
    dispatch(setIsLoadingConfirmations(true));

    try {
      await abrasaApi.put(`/open-confirmations/${confirmationId}`, confirmationData);
      
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'Confirmación actualizada exitosamente',
        type: 'success',
        link: { isLink: false, path: '' }
      }));

      dispatch(startGettingConfirmationsByEvent({ eventId, page, limit }));
    } catch (error) {
      console.log('Error al actualizar confirmación:', error);
      const errorMsg = error.response?.data?.error || 'No fue posible actualizar la confirmación';
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: typeof errorMsg === 'string' ? errorMsg : 'No fue posible actualizar la confirmación',
        type: 'error',
        link: { isLink: false, path: '' }
      }));
    }

    dispatch(setIsLoadingConfirmations(false));
  };
};

export const startCreatingConfirmation = (confirmationData = {}, { eventId = '', page = 1, limit = 30 }) => {
  return async (dispatch) => {
    dispatch(setIsLoadingConfirmations(true));

    try {
      await abrasaApi.post('/open-confirmations', confirmationData);
      
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'Confirmación registrada exitosamente',
        type: 'success',
        link: { isLink: false, path: '' }
      }));

      dispatch(startGettingConfirmationsByEvent({ eventId, page, limit }));
    } catch (error) {
      console.log('Error al registrar confirmación:', error);
      const errorMsg = error.response?.data?.error || 'No fue posible registrar la confirmación';
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: typeof errorMsg === 'string' ? errorMsg : 'No fue posible registrar la confirmación',
        type: 'error',
        link: { isLink: false, path: '' }
      }));
    }

    dispatch(setIsLoadingConfirmations(false));
  };
};

export const startExportingConfirmationsPdf = ({ eventId = '', eventName = 'evento' }) => {
  return async (dispatch) => {
    if (!eventId) return;
    dispatch(setIsExportingPdf(true));

    try {
      const response = await abrasaApi.get(`/open-confirmations/event/${eventId}/export/pdf`, {
        responseType: 'blob',
      });
      const blob = response.data instanceof Blob 
        ? response.data 
        : new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileNameClean = eventName.replace(/[^a-zA-Z0-9]/g, '_');
      link.setAttribute('download', `Confirmaciones_${fileNameClean}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log('Error al exportar PDF de confirmaciones:', error);
      dispatch(setAlert({
        isAlertOpen: true,
        contentAlert: 'No fue posible exportar el PDF de confirmaciones',
        type: 'error',
        link: { isLink: false, path: '' }
      }));
    }

    dispatch(setIsExportingPdf(false));
  };
};
