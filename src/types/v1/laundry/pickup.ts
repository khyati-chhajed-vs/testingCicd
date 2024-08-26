export interface LaundryParam {
  project_id: number;
  unit_id: number;
}

export interface LaundryPickupBody {
  request_date: string;
  request_time: string;
  comments: string;
}

export interface LaundryPickupRequest {
  Params: LaundryParam;
  Body: LaundryPickupBody;
}
