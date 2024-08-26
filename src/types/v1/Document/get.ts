export interface Documents {
  id: number;
  title: string;
  file: string;
  app_ip: string;
  add_time: string;
}

interface Param {
  project_id: number;
  unit_id: number;
  category_id: number;
}

interface Querystring {
  limit: number;
  offset: number;
}

export interface GetDocumentRequest {
  Params: Param;
  Querystring: Querystring;
}
