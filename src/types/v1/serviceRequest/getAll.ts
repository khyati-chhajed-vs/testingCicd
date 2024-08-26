interface ServiceRequestParam {
  project_id: number;
  unit_id: number;
}
interface ServiceRequestQueryParam {
  limit: number;
  offset: number;
}
export interface GetAllServiceRequest {
  Params: ServiceRequestParam;
  Querystring: ServiceRequestQueryParam;
}
