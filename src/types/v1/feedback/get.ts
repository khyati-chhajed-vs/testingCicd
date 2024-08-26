interface GetFeedbackParams {
  project_id: number;
  unit_id: number;
}
interface GetFeedbackQueryString {
  limit: number;
  offset: number;
}

export interface GetFeedbackRequest {
  Params: GetFeedbackParams;
  Querystring: GetFeedbackQueryString;
}
