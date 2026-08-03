import { useImportExcel } from '../../../../hooks/useImportExcel';
import { useEvents, useTickets } from '../../../../hooks';
import { useUI } from '../../../../../hooks';

export const ModalImportExcel = () => {
    const { event } = useEvents();
    const { createBulkTickets, page } = useTickets();
    const { closeModal } = useUI();

    const {
        ticketsPreview,
        fileName,
        errorMsg,
        handleFileUpload,
    } = useImportExcel();

    const handleConfirmImport = () => {
        if (ticketsPreview.length === 0) return;

        createBulkTickets(
            {
                event: event.id,
                tickets: ticketsPreview,
            },
            {
                eventID: event.id,
                page: page || 1,
                limit: 30,
            }
        );

        closeModal('eventPageModal');
    };

    return (
        <div style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <label
                    htmlFor="excel-upload"
                    className="btn btn--outline"
                    style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <i className="bx bx-file-find" style={{ fontSize: '1.4rem' }}></i>
                    {fileName ? `Archivo: ${fileName}` : 'Seleccionar archivo Excel (.xlsx / .csv)'}
                </label>
                <input
                    id="excel-upload"
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                />
            </div>

            {errorMsg && (
                <div style={{ color: '#e74c3c', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                    {errorMsg}
                </div>
            )}

            {ticketsPreview.length > 0 && (
                <>
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>
                            Boletos detectados: <mark style={{ background: '#e3f2fd', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{ticketsPreview.length}</mark>
                        </span>
                    </div>

                    <div style={{ maxHeight: '420px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1.5rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead style={{ background: '#f5f5f5', position: 'sticky', top: 0 }}>
                                <tr>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>#</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Nombre</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Teléfono</th>
                                    <th style={{ padding: '8px', textAlign: 'center' }}>Adultos</th>
                                    <th style={{ padding: '8px', textAlign: 'center' }}>Niños</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Mesas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketsPreview.map((item, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '8px' }}>{idx + 1}</td>
                                        <td style={{ padding: '8px', fontWeight: '500' }}>{item.name}</td>
                                        <td style={{ padding: '8px' }}>{item.phone || <em style={{ color: '#999' }}>Sin número</em>}</td>
                                        <td style={{ padding: '8px', textAlign: 'center' }}>{item.adultsQuantity}</td>
                                        <td style={{ padding: '8px', textAlign: 'center' }}>{item.kidsQuantity}</td>
                                        <td style={{ padding: '8px' }}>{item.table}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button
                            type="button"
                            onClick={handleConfirmImport}
                            className="btn btn--primary"
                            style={{ width: '100%' }}
                        >
                            <i className="bx bx-cloud-upload"></i> Importar {ticketsPreview.length} Boletos
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
