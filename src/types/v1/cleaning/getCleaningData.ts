export interface CleaningPathParams {
  project_id: number;
  unit_id: number;
}
export interface CleaningQueryParams {
  cleaning_type_id: number;
  year: number;
  month: number;
}

export interface CleaningDetailsRequest {
  Params: CleaningPathParams;
  Querystring: CleaningQueryParams;
}
