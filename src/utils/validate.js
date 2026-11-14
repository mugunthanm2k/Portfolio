// Contact form validation rules (shared by the form and any future server-side check).

export const LIMITS = { nameMin: 2, nameMax: 60, emailMax: 100, messageMin: 10, messageMax: 1000 };

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const NAME_RE = /^[\p{L}][\p{L}\s.'-]*$/u;
const PHONE_RE = /^\+?[\d\s-]{7,18}$/;

export const clean = (v) => String(v ?? '').replace(/\s+/g, ' ').trim();

export const FIELD_ORDER = ['name', 'email', 'phone', 'category', 'message'];

export function validateField(key, raw) {
  switch (key) {
    case 'name': {
      const v = clean(raw);
      if (!v) return 'Name is required.';
      if (v.length < LIMITS.nameMin) return `Name must be at least ${LIMITS.nameMin} characters.`;
      if (v.length > LIMITS.nameMax) return `Name is too long (max ${LIMITS.nameMax} characters).`;
      if (!NAME_RE.test(v)) return "Name can only contain letters, spaces and . ' -";
      return '';
    }
    case 'email': {
      const v = String(raw ?? '').trim();
      if (!v) return 'Email address is required.';
      if (v.length > LIMITS.emailMax) return 'Email address is too long.';
      if (!EMAIL_RE.test(v)) return 'Enter a valid email, e.g. name@example.com.';
      return '';
    }
    case 'phone': {
      const v = String(raw ?? '').trim();
      if (!v) return ''; // optional
      if (!PHONE_RE.test(v)) return 'Use digits only, with an optional + and spaces.';
      const digits = v.replace(/\D/g, '').length;
      if (digits < 7 || digits > 15) return 'Phone number must have 7 to 15 digits.';
      return '';
    }
    case 'category':
      return raw ? '' : 'Please choose a project category.';
    case 'message': {
      const v = String(raw ?? '').trim();
      if (!v) return 'Message is required.';
      if (v.length < LIMITS.messageMin) return `Message is too short (${v.length}/${LIMITS.messageMin} minimum).`;
      if (v.length > LIMITS.messageMax) return `Message is too long (max ${LIMITS.messageMax} characters).`;
      return '';
    }
    default:
      return '';
  }
}

export function validateContact(values) {
  const errors = {};
  FIELD_ORDER.forEach((k) => {
    const e = validateField(k, values[k]);
    if (e) errors[k] = e;
  });
  return errors;
}
