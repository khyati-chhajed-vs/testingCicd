/**
 * File: get
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 28-05-2024
 * Description: Schema for fetching laundry request history
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetLaundryResponseSchema: FastifySchema = {
  description: 'API to fetch laundry requests history',
  tags: ['Service'],
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
          id: { type: 'integer' },
          request_date: { type: 'string' },
          request_time: { type: 'string' },
          comments: { type: 'string' },
          request_status: { type: 'string' },
          add_time: { type: 'string' },
        },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
