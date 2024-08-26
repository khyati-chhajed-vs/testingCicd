/**
 * File: pickup
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 24-05-2024
 * Description: Schema for creating laundry pikcup request
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const LaundryPickupRequestSchema: FastifySchema = {
  description: 'API to create laundry pickup request',
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
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
