/**
 * File: cancel
 * Author: manoj.fulara@vectoscalar.com
 * Date: 02-06-2024
 * Description: Schema for delete api of airport pickup request
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const AirportPickupDeleteSchema: FastifySchema = {
  description: 'API to cancel airport pickup request',
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
      request_id: {
        type: 'number',
      },
    },
  },
  response: {
    204: {},
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
