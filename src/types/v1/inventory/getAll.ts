interface GetInventories {
  project_id: number;
  unit_id: number;
}
interface Querystring {
  limit: number;
  offset: number;
}
export interface GetInventoriesRequest {
  Params: GetInventories;
  Querystring: Querystring;
}
