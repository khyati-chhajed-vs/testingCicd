export const AIRPORT_PICKUP_ENDPOINT = '/airport';
export const AIRPORT_PICKUP_ERRORS = {
  DUPLICATE_REQUEST: {
    CODE: 'DUPLICATE_REQUEST',
  },
  BAD_REQUEST: {
    CODE: 'BAD_REQUEST',
  },
};

export const REQ_STATUS = {
  PENDING: 'PENDING',
  PROCESSED: 'PROCESSED',
};

export const LAUNDRY_ENDPOINT = '/laundry';
export const LAUNDRY_ERROR = {
  ALREADY_EXISTS: {
    CODE: 'LAUNDRY_REQUEST_ALREADY_EXISTS',
    MESSAGE: 'LAUNDRY_REQUEST_ALREADY_EXISTS',
  },
  BAD_REQUEST: {
    CODE: 'INVALID_REQUEST',
    MESSAGE: 'INVALID_REQUEST',
  },
};

export const REQUEST_ID_ENDPOINT = '/:request_id';
