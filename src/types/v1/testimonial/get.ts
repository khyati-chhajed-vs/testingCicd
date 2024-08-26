interface GetTestimonialsParams {
  project_id: number;
  unit_id: number;
}

interface Querystring {
  limit: number;
  offset: number;
}

export interface GetTestimonials {
  Params: GetTestimonialsParams;
  Querystring: Querystring;
}
