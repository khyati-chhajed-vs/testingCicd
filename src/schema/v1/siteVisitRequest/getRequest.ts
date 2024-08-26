/**
 * File: getRequest
 * Author: akshika.choudhary@vectoscalar.com
 * Date: 06-07-2024
 * Description: Schema for get site visit requests
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetSiteVisitRequestSchema: FastifySchema = {
  description: 'API to get site visit requests',
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
          id: { type: 'integer' },
          request_date: { type: 'string', format: 'date' },
          request_time: { type: 'string', pattern: '^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$' },
          comments: { type: 'string' },
          request_status: {
            type: 'string',
          },
        },
        required: ['id', 'request_date', 'request_time', 'request_status'],
      },
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
