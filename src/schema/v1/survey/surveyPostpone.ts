/**
 * File: survey postpone
 * Author: AKSHIKA CHOUDHARY
 * Date: 09-06-2024
 * Description: API schema for updating the count when a user skips a survey
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const SurveyPostponeSchema: FastifySchema = {
  description: 'API to skip survey',
  tags: ['Survey'],
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
    required: ['project_id', 'unit_id'],
  },
  response: {
    204: {},
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    404: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
