export const RAISED_COMPLAINT_ENDPOINT = '/complaints';
export const COMPLAINT_TYPES_ENDPOINT = '/complaints/types';
export const COMPLAINT_ID_ENDPOINT = '/:complaint_id';
export const ESCALATION_DAYS = 7;
export const ESCALATION_MONTHS = 1;

export const COMPLAINT_ERR = {
  COMPLAINT_NOT_FOUND: {
    CODE: 'COMPLAINT_NOT_FOUND',
  },
  BAD_REQUEST: {
    CODE: 'BAD_REQUEST',
  },
  NOT_ALLOWED: {
    CODE: 'NOT_ALLOWED',
  },
};
