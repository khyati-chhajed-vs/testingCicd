export interface UpdateNotificationQuery {
  project_id?: number;
  unit_id?: number;
}

export interface UpdateNotificationsRequest {
  Querystring: UpdateNotificationQuery;
}
