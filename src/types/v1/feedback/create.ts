interface SubmitFeedbackParams {
  project_id: number;
  unit_id: number;
}

interface SumitFeedbackBody {
  title: string;
  comment: string;
}

export interface SubmitFeedbackRequest {
  Params: SubmitFeedbackParams;
  Body: SumitFeedbackBody;
}

export interface SubmitFeedbackData {
  title: string;
  comment: string;
  user_id: number;
  project_id: number;
  unit_id: number;
  add_time: Date;
}
