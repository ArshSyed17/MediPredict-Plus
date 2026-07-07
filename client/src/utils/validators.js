/**
 * Validation Utility Functions
 * Common validation functions used across the application
 */

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Minimum 8 characters, at least one uppercase, one lowercase, one number
 */
export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate date
 */
export const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

/**
 * Validate age (must be between 0 and 120)
 */
export const isValidAge = (age) => {
  return age >= 0 && age <= 120;
};

/**
 * Validate number range
 */
export const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Validate required field
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};

/**
 * Validate minimum length
 */
export const hasMinLength = (value, min) => {
  return value && value.length >= min;
};

/**
 * Validate maximum length
 */
export const hasMaxLength = (value, max) => {
  return !value || value.length <= max;
};

/**
 * Validate numeric value
 */
export const isNumeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

/**
 * Validate positive number
 */
export const isPositive = (value) => {
  return isNumeric(value) && parseFloat(value) > 0;
};

/**
 * Validate integer
 */
export const isInteger = (value) => {
  return Number.isInteger(Number(value));
};

/**
 * Validate matching values (e.g., password confirmation)
 */
export const isMatching = (value1, value2) => {
  return value1 === value2;
};

/**
 * Validate file type
 */
export const isValidFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

/**
 * Validate file size (in bytes)
 */
export const isValidFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

/**
 * Validate health metrics ranges
 */
export const isValidBloodPressure = (systolic, diastolic) => {
  return isInRange(systolic, 70, 200) && isInRange(diastolic, 40, 130);
};

export const isValidHeartRate = (heartRate) => {
  return isInRange(heartRate, 40, 200);
};

export const isValidBloodSugar = (bloodSugar) => {
  return isInRange(bloodSugar, 50, 400);
};

export const isValidBMI = (bmi) => {
  return isInRange(bmi, 10, 50);
};

export default {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidUrl,
  isValidDate,
  isValidAge,
  isInRange,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isNumeric,
  isPositive,
  isInteger,
  isMatching,
  isValidFileType,
  isValidFileSize,
  isValidBloodPressure,
  isValidHeartRate,
  isValidBloodSugar,
  isValidBMI,
};
