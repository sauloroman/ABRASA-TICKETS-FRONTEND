import { useState } from 'react';
import * as XLSX from 'xlsx';

export const useImportExcel = () => {
  const [ticketsPreview, setTicketsPreview] = useState([]);
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setErrorMsg('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!rawRows || rawRows.length === 0) {
          setErrorMsg('El archivo Excel está vacío o no tiene datos válidos.');
          setTicketsPreview([]);
          return;
        }

        const getRowValue = (row, keywords) => {
          const rowKeys = Object.keys(row);
          for (const key of rowKeys) {
            const cleanKey = key
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-z0-9]/g, '');

            for (const keyword of keywords) {
              const cleanKeyword = keyword
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]/g, '');

              if (cleanKey.includes(cleanKeyword)) {
                return row[key];
              }
            }
          }
          return '';
        };

        const parsed = rawRows
          .map((row) => {
            const rawName = getRowValue(row, ['nombre', 'invitado', 'boleto', 'persona']);
            const rawAdults = getRowValue(row, ['adulto', 'adultos']);
            const rawKids = getRowValue(row, ['nino', 'ninos', 'infante', 'infantes']);
            const rawPhone = getRowValue(row, ['telefono', 'celular', 'phone', 'movil']);
            const rawTable = getRowValue(row, ['mesa', 'mesas']);

            const name = String(rawName || '').trim();
            const adultsQuantity = Number(rawAdults || 0);
            const kidsQuantity = Number(rawKids || 0);
            const phone = String(rawPhone || '').replace(/\D/g, '');
            const table = String(rawTable || 'Por asignar').trim();

            return {
              name,
              phone,
              adultsQuantity: isNaN(adultsQuantity) ? 0 : adultsQuantity,
              kidsQuantity: isNaN(kidsQuantity) ? 0 : kidsQuantity,
              table: table || 'Por asignar',
            };
          })
          .filter((item) => item.name !== '');

        if (parsed.length === 0) {
          setErrorMsg('No se encontraron boletos con nombres válidos en el archivo.');
          setTicketsPreview([]);
        } else {
          setTicketsPreview(parsed);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg('Error al leer el archivo Excel.');
        setTicketsPreview([]);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const resetImport = () => {
    setTicketsPreview([]);
    setFileName('');
    setErrorMsg('');
  };

  return {
    ticketsPreview,
    fileName,
    errorMsg,
    handleFileUpload,
    resetImport,
  };
};
