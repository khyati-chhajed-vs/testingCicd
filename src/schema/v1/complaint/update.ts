/**
 * File: update
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 18-07-2024
 * Description: Schema to esclate a complaint ticket for given project ID and unit ID
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const ComplaintEscalationSchema: FastifySchema = {
  description: 'API to esclate complaints ticket',
  tags: ['Complaint'],
  params: {
    type: 'object',
    properties: {
      project_id: {
        type: 'number',
      },
      unit_id: {
        type: 'number',
      },
      complaint_id: {
        type: 'number',
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      comments: { type: 'string' },
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
