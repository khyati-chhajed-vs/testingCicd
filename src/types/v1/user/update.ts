interface NotificationSettings {
  account_update: boolean;
  document_update: boolean;
  vianaar_support: boolean;
  payment_update: boolean;
  my_maintenance: boolean;
  revenue: boolean;
}

interface body {
  notification_settings: NotificationSettings;
}

export interface UserUpdateRequest {
  Body: body;
}
