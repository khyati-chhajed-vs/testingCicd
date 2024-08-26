/**
 * File: get
 * Author: akshika.choudhary@vectoscalar.com
 * Date: 28-05-2024
 * Description: Schema for fetching airport pickup request history
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetAirportPickupResponseSchema: FastifySchema = {
  description: 'API to fetch airport pickup requests history',
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
          airport_id: { type: 'string' },
          airport_name: { type: 'string' },
          number_of_pax: { type: 'string' },
          number_of_luggage: { type: 'string' },
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
