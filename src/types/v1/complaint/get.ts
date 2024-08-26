interface ComplaintParams {
  project_id: number;
  unit_id: number;
}

interface Querystring {
  limit: number;
  offset: number;
}

export interface GetComplaintRequest {
  Params: ComplaintParams;
  Querystring: Querystring;
}
