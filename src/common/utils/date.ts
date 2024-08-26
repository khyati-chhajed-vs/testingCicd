/**
 * File: dateUtils
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: Date related util methods
 */

import moment from 'moment-timezone';
import { logger } from '../services/logger.service';

export class DateUtils {
  /**
   * Method to add months to a given date
   * @param timestamp
   * @param numberOfMonths
   * @returns
   */
  static addMonthsToDate(timestamp: any, numberOfMonths: number): any {
    const futureDate = moment.utc(timestamp, 'YYYY-MM-DD HH:mm:ss').add(numberOfMonths, 'months');
    return futureDate;
  }

  /**
   * Method to get current timestamp
   * @returns
   */
  static getCurrentTimeStamp(): any {
    const date = new Date();
    const res = moment.utc(date, 'YYYY-MM-DD HH:mm:ss');

    logger.info('DateUtils -> getCurrentTimeStamp', res);
    return res;
  }

  /**
   * Method to get current date
   * @returns
   */
  static getCurrentDate(): any {
    const date = new Date();
    const res = moment.utc(date, 'YYYY-MM-DD');

    logger.info('DateUtils -> getCurrentDate', res);
    return res;
  }

  /*
   * Method to add hours to a date
   * @param date
   * @param hours
   * @returns
   */
  static addHoursToDate(date: Date, hours: number): Date {
    const newDate = new Date(date.getTime());
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }

  /**
   * Method to get the start and end date range of a month.
   * When the year and month are provided, it will return the date range for that month.
   * If no year and month are provided, it will default to the current month's date range.
   * @param year
   * @param month
   * @returns
   */
  static getMonthDateRange(year: number, month: number) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // The now.getMonth() returns the count between 0 to 11 and for making the month number between 1-12, we are adding 1 to it.

    const targetYear = year ?? currentYear;
    const targetMonth = month ?? currentMonth;

    const startDate = moment([targetYear, targetMonth - 1]); // Month is zero-based

    // Get the end date of the month
    const endDate = moment(startDate).endOf('month');
    const formattedStartDate = startDate.format('YYYY-MM-DD');
    const formattedEndDate = endDate.format('YYYY-MM-DD');

    return {
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };
  }

  /**
   * Method to get only date from a given date-time
   * @param date
   * @returns
   */
  static getDateOnly(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  static getLastMonthNameAndYear() {
    // Get the date one month ago
    const last_month_date = moment().subtract(1, 'months');
    // Format the month name and year
    const month_name = last_month_date.format('MMMM');
    const year = last_month_date.format('YYYY');
    const month_index = last_month_date.month() + 1;

    return { last_month_date, month_name, year, month_index };
  }
}
