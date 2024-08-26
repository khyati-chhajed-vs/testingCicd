/**
 * File: operations
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: operations Utils
 */

/**
 * Function to transform object to an array of key value pairs
 * @param obj
 * @returns
 */
function objectPropsToArray(obj: { [k: string]: any }) {
  return Object.entries(obj).map(([key, value]) => ({ [key]: value }));
}

export { objectPropsToArray };

/**
 * mask email
 * @param email
 * @returns
 */
export const maskEmail = (email: string) => {
  const maskedEmail = email.replace(/^(.{3})[^@]*([^@]{0,2}@.+)$/, '$1****$2');

  return maskedEmail;
};

/**
 * mask phone number
 * @param phoneNumber
 * @returns
 */
export const maskPhoneNumber = (phoneNumber: string) => {
  // Remove any non-digit characters from the phone number
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Replace the first six digits with asterisks and keep the last four digits
  const maskedNumber = '******' + digitsOnly.slice(-4);

  return maskedNumber;
};

/**
 * Function to convert a field to camel case
 * @param field
 * @returns
 */
export const convertToCamelCase = (field: string) => {
  return field.replace(/_([a-z])/g, (_: any, match: string) => match.toUpperCase());
};

/**
 * Function to replace keys present in message
 * @param message
 * @param obj  contains keys to replace in message with the values provided for the keys
 * @returns
 */
export const getTransformedErrMessage = (message: string, obj: { [k: string]: string }): string => {
  Object.keys(obj).forEach((key) => {
    message = message.replace(key, obj[key]);
  });
  return message;
};
