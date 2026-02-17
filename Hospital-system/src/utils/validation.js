export function normalizeNic(value) {
  return (value ?? '').toString().trim().replace(/\s+/g, '').toUpperCase();
}

export function validateSriLankaNic(value) {
  const nic = normalizeNic(value);
  if (!nic) return 'NIC is required';
  const isOld = /^\d{9}[VX]$/.test(nic);
  const isNew = /^\d{12}$/.test(nic);
  if (!isOld && !isNew) return 'NIC must be 10 characters (#########V/X) or 12 digits';
  return null;
}

export function normalizePhone(value) {
  return (value ?? '').toString().trim().replace(/[\s-]/g, '');
}

export function validateSriLankaPhone(value, { required = false } = {}) {
  const raw = (value ?? '').toString();
  const phone = normalizePhone(raw);
  if (!phone) return required ? 'Contact number is required' : null;

  const isLocal = /^0\d{9}$/.test(phone);
  const isIntl = /^\+94\d{9}$/.test(phone);
  if (!isLocal && !isIntl) return 'Contact number must be 10 digits (0XXXXXXXXX) or +94XXXXXXXXX';
  return null;
}

export function validateName(value, { required = false, maxLen = 100 } = {}) {
  const name = (value ?? '').toString().trim();
  if (!name) return required ? 'Name is required' : null;
  if (name.length > maxLen) return `Name must be at most ${maxLen} characters`;
  // Allow letters (unicode), spaces, apostrophes, dots, hyphens
  if (!/^[\p{L}][\p{L} .'-]*$/u.test(name)) return 'Name contains invalid characters';
  if (name.length < 2) return 'Name is too short';
  return null;
}

export function validateRelationship(value, { required = false, maxLen = 50 } = {}) {
  const rel = (value ?? '').toString().trim();
  if (!rel) return required ? 'Relationship is required' : null;
  if (rel.length > maxLen) return `Relationship must be at most ${maxLen} characters`;
  // Allow letters (unicode), spaces, apostrophes, dots, hyphens, slashes
  if (!/^[\p{L}][\p{L} .'-/]*$/u.test(rel)) return 'Relationship contains invalid characters';
  return null;
}

export function validateRequired(value, label = 'This field') {
  const v = (value ?? '').toString().trim();
  if (!v) return `${label} is required`;
  return null;
}

export function validateNumberRange(value, { required = false, min = 0, max = 120, label = 'Value' } = {}) {
  const raw = (value ?? '').toString().trim();
  if (!raw) return required ? `${label} is required` : null;
  const n = Number(raw);
  if (!Number.isFinite(n)) return `${label} must be a number`;
  if (n < min || n > max) return `${label} must be between ${min} and ${max}`;
  return null;
}

export function fieldClassName(base, hasError) {
  if (!hasError) return base;
  return `${base} border-red-500 focus:border-red-500 focus:ring-red-200`;
}
