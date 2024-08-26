import { SERVICE_REQUEST_STATUS } from 'src/common/constants';

interface params {
  project_id: number;
  unit_id: number;
}

interface body {
  is_welcome_video_watched: boolean;
  furnish_my_propety_status: SERVICE_REQUEST_STATUS.PROCESSING;
  survey_postpone_count: number;
  rental_request_status: SERVICE_REQUEST_STATUS.PROCESSING;
}

export interface ProjectUpdateRequest {
  Params: params;
  Body: body;
}
