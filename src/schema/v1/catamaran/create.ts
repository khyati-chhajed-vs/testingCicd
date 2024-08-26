/**
 * File: create
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 05-06-2024
 * Description: Schema to create catamaran request for given project ID and unit ID
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const CreateCatamaranRequestSchema: FastifySchema = {
  description: 'API to create catamaran request',
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
      book_in_date: { type: 'string', format: 'date' },
      slot_id: { type: 'number' },
      number_of_pax: { type: 'number' },
    },
    required: ['book_in_date', 'slot_id', 'number_of_pax'],
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
