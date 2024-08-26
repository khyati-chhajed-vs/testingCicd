/**
 * File: errors
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: Different type of errors that app can throw
 */

export class BadTokenError extends Error {
  constructor(
    public code: string,
    public message: string = 'Bad token error',
  ) {
    super();
  }
}

export class UnAuthorisedError extends Error {
  constructor(
    public code: string,
    public message: string = 'UnAuthorised Error',
  ) {
    super();
  }
}

export class DataValidationError extends Error {
  constructor(
    public code: string,
    public message: string = 'Invalid data error',
  ) {
    super();
  }
}

export class ServerError extends Error {
  constructor(
    public code: string,
    public message: string = 'Internal server error',
  ) {
    super();
  }
}

export class AlreadyExistError extends Error {
  constructor(
    public code: string,
    public message: string = 'Resource already exists',
  ) {
    super();
  }
}

export class UserMismatchError extends Error {
  constructor(
    public code: string,
    public message: string,
    public body: any,
  ) {
    super();
  }
}

export class NotFoundError extends Error {
  constructor(
    public code: string,
    public message: string = 'Resource not found error',
  ) {
    super();
  }
}

export class BadRequestError extends Error {
  constructor(
    public code: string,
    public message: string = 'Bad request error',
  ) {
    super();
  }
}

export class ThresholdExceededError extends Error {
  constructor(
    public code: string,
    public message: string = 'Threshold exceeded error',
  ) {
    super();
  }
}
