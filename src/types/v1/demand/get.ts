interface PendingPaymentParams {
  project_id: number;
  unit_id: number;
}
interface PendingPaymentQuery {
  demand_type: string;
  limit: number;
  offset: number;
}
export interface GetPendingPaymentRequest {
  Params: PendingPaymentParams;
  Querystring: PendingPaymentQuery;
}
