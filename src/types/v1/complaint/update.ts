interface ComplaintEscalationParams {
  project_id: number;
  unit_id: number;
  complaint_id: number;
}
interface ComplaintEscalationBody {
  comments: string;
}
export interface ComplaintEscalationRequest {
  Params: ComplaintEscalationParams;
  Body: ComplaintEscalationBody;
}
