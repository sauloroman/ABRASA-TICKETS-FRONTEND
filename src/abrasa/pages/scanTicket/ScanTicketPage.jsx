import { useNavigate, useParams } from 'react-router-dom';
import { LayoutAbrasa } from '../../layout';
import { ScanTicketForm, ScanTicketInfo } from './components';
import { useScanTicket } from '../../hooks';
import { useEffect } from 'react';

export const ScanTicketPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTicketScanned } = useScanTicket();

  useEffect(() => {
    getTicketScanned(id);
  }, []);

  return (
    <LayoutAbrasa>
      <div className="scanTicket">
        <header className="scanTicket__header">
          <button
            onClick={() => navigate(-1)}
            className="scanTicket__return btn btn--black"
          >
            &larr; Regresar
          </button>
        </header>
        <div className="scanTicket__grid">
          <ScanTicketInfo />
          <ScanTicketForm />
        </div>
      </div>
    </LayoutAbrasa>
  );
};
