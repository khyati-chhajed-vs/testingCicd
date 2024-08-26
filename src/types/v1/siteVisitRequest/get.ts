export interface GetSiteVisitRequestParams {
  project_id: number;
  unit_id: number;
}

interface Querystring {
  limit: number;
  offset: number;
}

export interface GetSiteVisitRequest {
  Params: GetSiteVisitRequestParams;
  Querystring: Querystring;
}
