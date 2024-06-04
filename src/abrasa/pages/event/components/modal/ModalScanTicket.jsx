import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-scanner';
import { useUI } from '../../../../../hooks';

export const ModalScanTicket = () => {
  const navigate = useNavigate();
  const [scannedResult, setScannedResult] = useState('');
  const { closeModal } = useUI();

  const handleScan = useCallback((result) => {
    if (result) {
      const { text } = result;
      setScannedResult(JSON.parse(text));
    }
  }, []);

  const handleError = useCallback((error) => {
    console.error(error);
  }, []);

  const onNavigateScanPage = () => {
    closeModal('eventPageModal');
    navigate(`/scanTicket/${scannedResult.id}`);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        constraints={{
          facingMode: 'environment'
        }}
      />

      {scannedResult.id && (
        <div className="layout-modal__info">
          <p className="layout-modal__text">
            Nombre: <span>{scannedResult.ticketName}</span>
          </p>
          <p className="layout-modal__text">
            Id: <span>{scannedResult.id}</span>
          </p>
          <button onClick={onNavigateScanPage} className="btn btn--black">
            Actualizar Boleto
          </button>
        </div>
      )}
    </div>
  );
};
