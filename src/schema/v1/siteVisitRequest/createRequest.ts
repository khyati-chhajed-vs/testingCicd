/**
 * File: createRequest
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 31-05-2024
 * Description: Schema for creating site visit request
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const SiteVisitRequestSchema: FastifySchema = {
  description: 'API to create site visit request',
  tags: ['Site Visit Request'],
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
  },
  body: {
    type: 'object',
    properties: {
      request_date: { type: 'string', format: 'date' },
      request_time: { type: 'string', format: 'time' },
      comments: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'number',
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
