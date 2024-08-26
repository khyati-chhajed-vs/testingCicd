/**
 * File: create
 * Author: manoj.fulara@vectoscalar.com
 * Date: 24-05-2024
 * Description: Schema for creating airport pickup request
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const AirportPickupRequestSchema: FastifySchema = {
  description: 'API to create airport pickup request',
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
      airport_id: { type: 'number' },
      number_of_pax: { type: 'number', minimum: 1 },
      number_of_luggage: { type: 'number' },
    },
    required: ['request_date', 'request_time', 'airport_id', 'number_of_pax', 'number_of_luggage'],
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
