export const CATAMARAN_ENDPOINT = '/catamaran';

/**TODO take this from config api */
export const PRIOR_BOOKING_TIME = 24;
export const CATAMARAN_ERROR = {
  NOT_FOUND: {
    CODE: 'CATAMARAN_REQUEST_NOT_FOUND',
  },
  NOT_AVAILABLE: {
    CODE: 'SLOT_NOT_AVAILABLE',
  },
  PRIOR_BOOKING_LIMIT: {
    CODE: 'PRIOR_BOOKING_LIMIT_EXCEEDED',
  },
  INVALID_NO_OF_PAX: {
    CODE: 'INVALID_NO_OF_PAX',
  },
};
