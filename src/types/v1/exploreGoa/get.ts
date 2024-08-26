interface RecommendationsRequestParam {
  category_id: number;
}
interface Querystring {
  limit: number;
  offset: number;
  area_id: number;
}
export interface RecommendationsRequest {
  Params: RecommendationsRequestParam;
  Querystring: Querystring;
}
