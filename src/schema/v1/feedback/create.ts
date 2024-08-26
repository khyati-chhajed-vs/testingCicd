/**
 * File: create
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 11-06-2024
 * Description: Schema for submitting feedback
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const SubmitFeedbackSchema: FastifySchema = {
  description: 'API to submit feedback',
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
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      comment: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'number',
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
