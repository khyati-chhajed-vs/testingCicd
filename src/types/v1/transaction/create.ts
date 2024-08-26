interface CreateTransactionBody {
  amount: number;
}
interface CreateTransactionParams {
  project_id: number;
  unit_id: number;
  demand_id: number;
}
export interface createTransactionRequest {
  Body: CreateTransactionBody;
  Params: CreateTransactionParams;
}
