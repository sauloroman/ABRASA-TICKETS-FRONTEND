import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-scanner';
import { useUI } from '../../../../../hooks';

export const ModalScanTicket = () => {
  const navigate = useNavigate();
  const { closeModal } = useUI();

  const handleScan = useCallback(
    (result) => {
      if (result) {
        try {
          const { text } = result;
          const parsed = typeof text === 'string' ? JSON.parse(text) : text;

          if (parsed && parsed.id) {
            closeModal('eventPageModal');

            const channel = new BroadcastChannel('abrasa_welcome_projection')

            channel.postMessage({ ticketId: parsed.id })

            channel.close()

            navigate(`/scanTicket/${parsed.id}`);
          }
        } catch (err) {
          console.error('Error al leer código QR:', err);
        }
      }
    },
    [closeModal, navigate]
  );

  const handleError = useCallback((error) => {
    console.error(error);
  }, []);

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        constraints={{
          video: {
            facingMode: 'environment',
          },
        }}
      />
    </div>
  );
};
