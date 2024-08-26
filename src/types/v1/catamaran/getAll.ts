interface Param {
  project_id: number;
  unit_id: number;
}

interface Querystring {
  limit: number;
  offset: number;
}

export interface GetCatamaranRequest {
  Params: Param;
  Querystring: Querystring;
}
