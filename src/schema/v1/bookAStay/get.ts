/**
 * File: get
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 10-06-2024
 * Description: schema to fetch current active book a stay request
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const getActiveRequestSchema: FastifySchema = {
  description: 'API to fetch current active book a stay request',
  tags: ['Book A Stay'],
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

  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        check_in_date: {
          type: 'string',
          format: 'date',
        },
        check_out_date: {
          type: 'string',
          format: 'date',
        },
        location: {
          type: 'string',
        },
        no_of_guests: {
          type: 'integer',
          minimum: 1,
        },
        request_status: {
          type: 'string',
        },
        add_time: {
          type: 'string',
          format: 'date-time',
        },
      },
      additionalProperties: false,
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
