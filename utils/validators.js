export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isPositiveNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
}

export function validateProductPayload(payload) {
  const errors = [];

  if (!isNonEmptyString(payload?.nom ?? payload?.name)) {
    errors.push('Le nom du produit est requis.');
  }

  if (!isPositiveNumber(payload?.prix ?? payload?.price)) {
    errors.push('Le prix doit être un nombre positif.');
  }

  if (!isPositiveNumber(payload?.stock ?? 1)) {
    errors.push('Le stock doit être supérieur à 0.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
