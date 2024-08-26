interface SurveyParams {
  project_id: number;
  unit_id: number;
}
interface SurveyData {
  question_id: number;
  answer: string;
  category: string;
}
interface SurveyBody {
  survey_data: SurveyData[];
}

export interface SubmitSurveyRequest {
  Body: SurveyBody;
  Params: SurveyParams;
}
