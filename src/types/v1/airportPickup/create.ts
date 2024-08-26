export interface CreateAirportPickupBody {
  request_date: string;
  request_time: string;
  airport_id: number;
  number_of_pax: number;
  number_of_luggage: number;
}
export interface CreateAirportPickupParams {
  project_id: number;
  unit_id: number;
}
export interface CreateAirportPickupRequest {
  Body: CreateAirportPickupBody;
  Params: CreateAirportPickupParams;
}
