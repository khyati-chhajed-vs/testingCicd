export interface GetAirportRequestParams {
  project_id: number;
  unit_id: number;
}
interface Querystring {
  limit: number;
  offset: number;
}
export interface GetAirportRequest {
  Params: GetAirportRequestParams;
  Querystring: Querystring;
}
