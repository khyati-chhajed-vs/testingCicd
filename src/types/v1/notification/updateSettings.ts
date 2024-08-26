export interface UpdateNotificationSettingsQuery {
  project_id: number;
  unit_id: number;
}
export interface NotificationSettingsBody {
  revenue: boolean;
  account_update: boolean;
  my_maintenance: boolean;
  payment_update: boolean;
  document_update: boolean;
  vianaar_support: boolean;
  property_update_notification: boolean;
}
export interface UpdateNotificationsSettingsRequest {
  Querystring: UpdateNotificationSettingsQuery;
  Body: NotificationSettingsBody;
}
