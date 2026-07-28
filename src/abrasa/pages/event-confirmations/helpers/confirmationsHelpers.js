export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
};

export const formatWhatsappLink = (phoneStr) => {
  if (!phoneStr) return '#';
  const cleanPhone = phoneStr.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}`;
};
