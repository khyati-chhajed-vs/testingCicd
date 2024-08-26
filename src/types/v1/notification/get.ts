export interface GetNotificationQueryString {
  project_id?: number;
  unit_id?: number;
  limit: number;
  offset: number;
}
export interface GetNotificationRequest {
  Querystring: GetNotificationQueryString;
}
