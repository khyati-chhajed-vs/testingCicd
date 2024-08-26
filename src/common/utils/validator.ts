/**
 * File: validator
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: Validation Utils
 */

export class Validator {
  /**
   * Method to validate the email address
   * @param email
   * @returns
   */
  static validateEmail(email: string): boolean {
    /* For email address -
     * One or more characters without whitespace
     * + @ Symbol + one or more characters without whitespace
     * + . Symbol + one or more characters without whitespace
     */
    const emailRegExpPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegExpPattern.test(email);
  }
}
