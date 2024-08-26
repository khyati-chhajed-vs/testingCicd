export interface DocumentRequestParam {
  project_id: number;
  unit_id: number;
}

export interface DocumentRequestBody {
  title: string;
  category_id: number;
  document_url: string;
  status: string;
}

export interface UploadDocumentRequest {
  Params: DocumentRequestParam;
  Body: DocumentRequestBody;
}
