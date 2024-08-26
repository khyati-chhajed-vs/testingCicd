interface ComplaintRequestParams {
  project_id: number;
  unit_id: number;
}
interface ComplaintRequestBody {
  complaint_title: 'string';
  complaint_type_id: 'number';
  issue_id: 'number';
  comments: 'string';
  request_status: 'string';
  file_url: 'string';
}
export interface ComplaintRequest {
  Params: ComplaintRequestParams;
  Body: ComplaintRequestBody;
}
