interface GetTransactionParams {
  project_id: number;
  unit_id: number;
  demand_id: number;
}

export interface GetTransactionRequest {
  Params: GetTransactionParams;
}
