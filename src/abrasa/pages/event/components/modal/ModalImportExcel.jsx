import { useState } from 'react';
import { useImportExcel } from '../../../../hooks/useImportExcel';
import { useEvents, useTickets } from '../../../../hooks';
import { useUI } from '../../../../../hooks';

export const ModalImportExcel = () => {
    const { event } = useEvents();
    const { createBulkTickets, page } = useTickets();
    const { closeModal } = useUI();
    const [isImporting, setIsImporting] = useState(false);

    const {
        ticketsPreview,
        fileName,
        errorMsg,
        handleFileUpload,
    } = useImportExcel();

    const handleConfirmImport = async () => {
        if (ticketsPreview.length === 0 || isImporting) return;

        setIsImporting(true);

        const success = await createBulkTickets(
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

        setIsImporting(false);

        if (success) {
            closeModal('eventPageModal');
        }
    };

    if (isImporting) {
        return (
            <div className="modal-import-excel modal-import-excel--loading">
                <div className="modal-import-excel__loader-icon-wrapper">
                    <i className="bx bx-loader-alt bx-spin modal-import-excel__loader-icon"></i>
                </div>
                <h3 className="modal-import-excel__loading-title">
                    Generando e importando {ticketsPreview.length} boletos...
                </h3>
                <p className="modal-import-excel__loading-desc">
                    Por favor espera un momento. Estamos registrando los invitados, asignando claves de acceso de 5 dígitos y generando los códigos QR en Cloudinary.
                </p>
            </div>
        );
    }

    return (
        <div className="modal-import-excel">
            <div className="modal-import-excel__upload-container">
                <label
                    htmlFor="excel-upload"
                    className="btn btn--outline modal-import-excel__file-label"
                >
                    <i className="bx bx-file-find modal-import-excel__icon-file"></i>
                    {fileName ? `Archivo: ${fileName}` : 'Seleccionar archivo Excel (.xlsx / .csv)'}
                </label>
                <input
                    id="excel-upload"
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    className="modal-import-excel__file-input"
                    style={{ display: 'none' }}
                />
            </div>

            {errorMsg && (
                <div className="modal-import-excel__error">
                    {errorMsg}
                </div>
            )}

            {ticketsPreview.length > 0 && (
                <>
                    <div className="modal-import-excel__header">
                        <span style={{ fontWeight: 'bold' }}>
                            Boletos detectados: <mark className="modal-import-excel__count-badge">{ticketsPreview.length}</mark>
                        </span>
                    </div>

                    <div className="modal-import-excel__table-wrapper">
                        <table className="modal-import-excel__table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th className="modal-import-excel__table-th--center">Adultos</th>
                                    <th className="modal-import-excel__table-th--center">Niños</th>
                                    <th>Mesas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketsPreview.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td className="modal-import-excel__table-td--name">{item.name}</td>
                                        <td>{item.phone || <em className="modal-import-excel__no-phone">Sin número</em>}</td>
                                        <td className="modal-import-excel__table-td--center">{item.adultsQuantity}</td>
                                        <td className="modal-import-excel__table-td--center">{item.kidsQuantity}</td>
                                        <td>{item.table}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-import-excel__actions">
                        <button
                            type="button"
                            onClick={handleConfirmImport}
                            className="btn btn--secondary modal-import-excel__submit-btn"
                        >
                            <i className="bx bx-cloud-upload"></i> Importar {ticketsPreview.length} Boletos
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
