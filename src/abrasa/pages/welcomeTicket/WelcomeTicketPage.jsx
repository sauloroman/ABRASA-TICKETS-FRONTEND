import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useScanTicket } from '../../hooks';

export const WelcomeTicketPage = () => {
    const { id } = useParams();
    const { getTicketScanned, ticketScanned, resetTicketScanned } = useScanTicket();

    useEffect(() => {
        if (id && id !== 'live') {
            getTicketScanned(id);
        }

        const channel = new BroadcastChannel('abrasa_welcome_projection');
        channel.onmessage = (evt) => {
            if (evt.data && evt.data.action === 'reset') {
                resetTicketScanned();
            } else if (evt.data && evt.data.ticketId) {
                getTicketScanned(evt.data.ticketId);
            }
        };


        return () => {
            channel.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const {
        id: scannedId,
        name = 'Invitado Especial',
        table = 'Por asignar',
        adultsQuantity = 0,
        kidsQuantity = 0,
        adultsCounter = 0,
        kidsCounter = 0,
    } = ticketScanned || {};

    const adultsAvailable = adultsQuantity - adultsCounter;
    const kidsAvailable = kidsQuantity - kidsCounter;
    const isValid = adultsAvailable > 0 || kidsAvailable > 0;

    if (!scannedId) {
        return (
            <div className="welcome-screen welcome-screen--valid" style={{ background: '#191d39' }}>
                <div className="welcome-screen__container">
                    <div className="welcome-screen__badge">
                        <i className="bx bx-tv"></i>
                        <span>PANTALLA DE BIENVENIDA EN VIVO</span>
                    </div>
                    <h1 className="welcome-screen__guest-name">
                        Esperando invitados en la recepción...
                    </h1>
                    <p style={{ color: '#aaa', fontSize: '1.2rem' }}>
                        Al escanear un boleto de acceso, los datos del invitado aparecerán automáticamente aquí.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`welcome-screen ${isValid ? 'welcome-screen--valid' : 'welcome-screen--invalid'}`}>
            <div className="welcome-screen__container">
                <div className="welcome-screen__badge">
                    <i className={`bx ${isValid ? 'bx-check-circle' : 'bx-x-circle'}`}></i>
                    <span>{isValid ? 'ACCESO AUTORIZADO' : 'PASES AGOTADOS'}</span>
                </div>

                <h2 className="welcome-screen__subtitle">{isValid ? '¡Te damos la cordial bienvenida!' : 'Pases agotados'}</h2>
                <h1 className="welcome-screen__guest-name">{name}</h1>

                {/* Resumen de Pases */}
                <div className="welcome-screen__passes-grid">
                    <div className="welcome-screen__pass-box">
                        <span className="welcome-screen__pass-title">Adultos RESTANTES</span>
                        <strong className="welcome-screen__pass-count">{adultsAvailable}</strong>
                    </div>
                    {kidsQuantity > 0 && (
                        <div className="welcome-screen__pass-box">
                            <span className="welcome-screen__pass-title">Niños RESTANTES</span>
                            <strong className="welcome-screen__pass-count">{kidsAvailable}</strong>
                        </div>
                    )}
                </div>

                {/* Tarjeta Destacada de Mesa */}
                <div className="welcome-screen__table-card">
                    <span className="welcome-screen__table-label">SU MESA ASIGNADA</span>
                    <strong className="welcome-screen__table-number">{table}</strong>
                </div>

            </div>
        </div>
    );
};
