/**
 * File: create
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 18-06-2024
 * Description: Schema to raise a ticket for given project ID and unit ID
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const ComplaintRequestSchema: FastifySchema = {
  description: 'API to raise a ticket',
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
    },
  },
  body: {
    type: 'object',
    properties: {
      complaint_title: { type: 'string' },
      complaint_type_id: { type: 'number' },
      issue_id: { type: 'number' },
      comments: { type: 'string' },
      file_url: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'number',
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    409: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
