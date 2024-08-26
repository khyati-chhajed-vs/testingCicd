export interface LaundryDeleteParams {
  project_id: number;
  unit_id: number;
  request_id: number;
}

export interface LaundryDeleteRequest {
  Params: LaundryDeleteParams;
}
