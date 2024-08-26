/**
 * File: createRequest
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 31-05-2024
 * Description: Schema for deleting site visit request
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const DeleteSiteVisitRequestSchema: FastifySchema = {
  description: 'API to create site visit request',
  tags: ['Site Visit Request'],
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
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
