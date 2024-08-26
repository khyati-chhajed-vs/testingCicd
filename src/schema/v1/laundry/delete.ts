/**
 * File: delete
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 31-05-2024
 * Description: Schema for api to delete laundry request
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const DeleteRequestSchema: FastifySchema = {
  description: 'API to delete laundry request',
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
