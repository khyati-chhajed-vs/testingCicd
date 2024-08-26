interface BookAStayBody {
  check_in_date: string;
  check_out_date: string;
  location: string;
  no_of_guests: number;
}
interface BookAStayParams {
  project_id: number;
  unit_id: number;
}
export interface CreateBookAStayRequest {
  Params: BookAStayParams;
  Body: BookAStayBody;
}
