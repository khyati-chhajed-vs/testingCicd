/**
 * File: getAll
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 04-06-2024
 * Description: Schema to get all catamaran request
 * for given project ID and unit ID
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetAllCatamaranRequestSchema: FastifySchema = {
  description: 'API to fetch all catamaran request',
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
          book_in_date: { type: 'string', format: 'date' },
          cost: { type: 'number' },
          from_time: { type: 'string', format: 'time' },
          to_time: { type: 'string', format: 'time' },
          comments: { type: 'string' },
          admin_comments: { type: ['string', 'null'] },
          request_status: { type: 'string' },
          payment_status: { type: 'string' },
          number_of_pax: { type: 'number' },
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
