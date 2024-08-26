interface PlanRequestParam {
  project_id: number;
  unit_id: number;
}

export interface GetPlanRequest {
  Params: PlanRequestParam;
}
