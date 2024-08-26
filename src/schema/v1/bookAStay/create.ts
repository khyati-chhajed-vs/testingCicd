/**
 * File: create
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 06-06-2024
 * Description:schema to create book a stay request
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const CreateBookaStaySchema: FastifySchema = {
  description: 'API to create book a stay request',
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
  body: {
    type: 'object',
    properties: {
      check_in_date: { type: 'string', format: 'date' },
      check_out_date: { type: 'string', format: 'date' },
      location: { type: 'string' },
      no_of_guests: { type: 'number', minimum: 1 },
    },
    required: ['check_in_date', 'check_out_date', 'location', 'no_of_guests'],
  },
  response: {
    201: {
      id: { type: 'number' },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
