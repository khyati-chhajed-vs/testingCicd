/**
 * File: getAll
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 18-06-2024
 * Description:API schema to fetch all service request details
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const ServiceRequestSchema: FastifySchema = {
  description: 'API to fetch all service request details',
  tags: ['Service Request'],
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
          id: { type: 'number' },
          title: { type: 'string' },
          description: { type: 'string' },
          request_date: { type: 'string', format: 'date' },
          request_time: { type: 'string', format: 'time' },
          request_status: { type: 'string' },
          add_by: { type: 'string' },
        },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
