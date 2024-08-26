export const PROJECT_STATUS = {
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
};

export const PROJECT_ENDPOINT = '/projects';
export const PROJECT_ID_ENDPOINT = '/:project_id';
export const TEAM_ENDPOINT = '/team';
export const UNIT_ENDPOINT = '/units';
export const UNIT_ID_ENDPOINT = '/:unit_id';
export const RECOMMENDATIONS_ENDPOINT = '/recommendations';
export const CONTACTS_ENDPOINT = '/contacts';
export const PROGRESS_ENDPOINT = '/progress';
export const RECOMMENDATION_ERR = {
  NOT_FOUND: {
    CODE: 'RECOMMENDATION_NOT_FOUND',
  },
};

export const FURNISH_PROPERTY_REQUEST_ERR = {
  ALREADY_EXISTS: {
    CODE: 'REQUEST_ALREADY_EXISTS',
  },
};

export enum SERVICE_REQUEST_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}
