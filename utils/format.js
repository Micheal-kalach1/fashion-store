export function formatCurrency(amount, currency = 'XOF', locale = 'fr-FR') {
  const safeAmount = Number.isFinite(amount) ? amount : 0;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(safeAmount);
}

export function formatDate(dateInput, locale = 'fr-FR') {
  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    return 'Date invalide';
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(date);
}

export function truncateText(value, max = 120) {
  if (typeof value !== 'string') return '';
  if (value.length <= max) return value;

  return `${value.slice(0, max - 1)}…`;
}
