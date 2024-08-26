/**
 * File: get
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 15-07-2024
 * Description: Schema for fetching customer testimonials
 * for given project ID and unit ID
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetTestimonialResponseSchema: FastifySchema = {
  description: 'API to fetch customer testimonials',
  tags: ['Testimonial'],
  params: {
    type: 'object',
    properties: {
      project_id: {
        type: 'number',
      },
      unit_id: {
        type: 'number',
      },
    },
    required: ['project_id', 'unit_id'],
  },
  querystring: {
    type: 'object',
    properties: {
      limit: { type: 'number', default: 10 },
      offset: { type: 'number', default: 0 },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          rating: { type: 'number' },
          review: { type: 'string' },
          add_time: { type: 'string' },
        },
      },
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    404: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
