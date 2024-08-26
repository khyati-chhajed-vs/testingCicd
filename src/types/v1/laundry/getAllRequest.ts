export interface GetLaundryRequestParams {
  project_id: number;
  unit_id: number;
}
interface Querystring {
  limit: number;
  offset: number;
}
export interface GetLaundryRequest {
  Params: GetLaundryRequestParams;
  Querystring: Querystring;
}
