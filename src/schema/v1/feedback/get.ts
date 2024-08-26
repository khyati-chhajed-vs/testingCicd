/**
 * File: get
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 11-06-2024
 * Description: Schema to get feedback
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetFeedbackResponseSchema: FastifySchema = {
  description: 'API to get feedback',
  tags: ['Feedback'],
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
          id: { type: 'number' },
          title: { type: 'string' },
          comment: { type: 'string' },
          add_time: { type: 'string', format: 'date-time' },
        },
      },
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
