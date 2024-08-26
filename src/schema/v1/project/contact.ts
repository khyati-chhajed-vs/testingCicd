/**
 * File: get
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 24-05-2024
 * Description: Schema for get api of emergency contact
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetContactResponseSchema: FastifySchema = {
  description: 'API to fetch emergency contact for given project id',
  tags: ['Project'],
  params: {
    type: 'object',
    properties: {
      project_id: {
        type: 'number',
      },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          emergency_id: { type: 'integer' },
          emergency_name: { type: 'string' },
          emergency_phone: { type: 'string' },
          add_time: { type: 'string', format: 'date-time' },
        },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
