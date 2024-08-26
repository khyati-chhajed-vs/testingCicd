/**
 * File: get
 * Author: moinuddin.ansari@vianaar.co.in & sonu.singh@vianaar.co.in
 * Date: 01-08-2024
 * Description: Schema for API to fetch user types for vcare login
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetUserTypeSchema: FastifySchema = {
  description: 'API to fetch vcare user types',
  tags: ['Get VCare User'],

  params: {
    type: 'object',
    properties: {
      caretaker_id: {
        type: 'number',
      },
    },
    required: ['caretaker_id'],
  },

  response: {
    200: {
      type: 'array',
      properties: {
        caretaker_id: { type: 'number' },
        user_type: { type: 'string' },
        email: { type: 'string' },
        mobile: { type: 'number' },
        password: { type: 'string' },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    404: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
