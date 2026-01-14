import { z } from 'zod';

// Numeric validation helpers
export const parsePrice = (value: string, fieldName = 'Price'): number => {
  const trimmed = value.trim();
  if (trimmed === '') {
    throw new Error(`${fieldName} is required`);
  }
  const parsed = parseFloat(trimmed);
  if (isNaN(parsed) || !isFinite(parsed)) {
    throw new Error(`${fieldName} must be a valid number`);
  }
  if (parsed < 0) {
    throw new Error(`${fieldName} cannot be negative`);
  }
  if (parsed > 10000000) {
    throw new Error(`${fieldName} exceeds maximum allowed value (₹1,00,00,000)`);
  }
  return parsed;
};

export const parsePositiveInt = (value: string, fieldName = 'Value', max = 9999): number => {
  const trimmed = value.trim();
  if (trimmed === '') {
    return 0;
  }
  const parsed = parseInt(trimmed, 10);
  if (isNaN(parsed) || !isFinite(parsed)) {
    throw new Error(`${fieldName} must be a valid whole number`);
  }
  if (parsed < 0) {
    throw new Error(`${fieldName} cannot be negative`);
  }
  if (parsed > max) {
    throw new Error(`${fieldName} exceeds maximum allowed value (${max})`);
  }
  return parsed;
};

export const parseQuantity = (value: string, fieldName = 'Quantity'): number => {
  return parsePositiveInt(value, fieldName, 999999);
};

export const parseDuration = (value: string, fieldName = 'Duration'): number => {
  return parsePositiveInt(value, fieldName, 1440); // Max 24 hours in minutes
};

export const parseMonths = (value: string, fieldName = 'Months'): number => {
  return parsePositiveInt(value, fieldName, 120); // Max 10 years
};

export const parseVisits = (value: string, fieldName = 'Visits'): number => {
  return parsePositiveInt(value, fieldName, 365); // Max 1 per day for a year
};

// Zod schemas for reusable validation
export const priceSchema = z.number()
  .nonnegative('Price cannot be negative')
  .max(10000000, 'Price exceeds maximum allowed value');

export const quantitySchema = z.number()
  .int('Quantity must be a whole number')
  .nonnegative('Quantity cannot be negative')
  .max(999999, 'Quantity exceeds maximum allowed value');

export const durationMinutesSchema = z.number()
  .int('Duration must be a whole number')
  .nonnegative('Duration cannot be negative')
  .max(1440, 'Duration cannot exceed 24 hours');

export const monthsSchema = z.number()
  .int('Months must be a whole number')
  .positive('Months must be at least 1')
  .max(120, 'Duration cannot exceed 10 years');

export const visitsSchema = z.number()
  .int('Visits must be a whole number')
  .nonnegative('Visits cannot be negative')
  .max(365, 'Visits cannot exceed 365');
