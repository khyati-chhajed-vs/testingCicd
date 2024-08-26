export interface SiteVisitRequestParams {
  project_id: number;
  unit_id: number;
}

export interface SiteVisitRequestBody {
  request_date: string;
  request_time: string;
  comments: string;
}

export interface SiteVisitRequest {
  Params: SiteVisitRequestParams;
  Body: SiteVisitRequestBody;
}
