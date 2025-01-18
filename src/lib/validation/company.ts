import { normalizeWebsite } from '../companies';

export function validateCompanyData(data: {
  name: string;
  website: string;
  type: string;
}) {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = 'Company name is required';
  } else if (data.name.length < 2) {
    errors.name = 'Company name must be at least 2 characters';
  }

  if (!data.website?.trim()) {
    errors.website = 'Company website is required';
  } else {
    try {
      const normalized = normalizeWebsite(data.website);
      if (!normalized) {
        errors.website = 'Invalid website URL';
      }
    } catch {
      errors.website = 'Invalid website URL';
    }
  }

  if (!data.type?.trim()) {
    errors.type = 'Company type is required';
  }

  return errors;
}