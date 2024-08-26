interface CreateCatamaranRequestParams {
  project_id: number;
  unit_id: number;
}
interface CreateCatamaranRequestBody {
  book_in_date: string;
  slot_id: number;
  number_of_pax: number;
}
export interface CreateCatamaranRequest {
  Params: CreateCatamaranRequestParams;
  Body: CreateCatamaranRequestBody;
}
