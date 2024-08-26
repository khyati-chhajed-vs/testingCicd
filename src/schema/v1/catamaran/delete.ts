/**
 * File: delete
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 05-06-2024
 * Description: Schema to delete catamaran request for given request ID
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const DeleteCatamaranRequestSchema: FastifySchema = {
  description: 'API to delete catamaran request for given request ID',
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
