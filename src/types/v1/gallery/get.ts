interface GalleryRequestParam {
  project_id: number;
  unit_id: number;
}

interface Querystring {
  limit: number;
  offset: number;
  category: string;
}

export interface GetGalleryRequest {
  Params: GalleryRequestParam;
  Querystring: Querystring;
}
