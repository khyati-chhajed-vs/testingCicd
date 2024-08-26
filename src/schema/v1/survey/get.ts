/**
 * File: get.ts
 * Author: akshika.choudhary@vectoscalar.com
 * Date: 11-06-2024
 * Description: API to get survey questions
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const getSurveySchema: FastifySchema = {
  description: 'API to get survey questions',
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
    200: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
        },
        question_data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              question_id: { type: 'number' },
              title: { type: 'string' },
              category: { type: 'string' },
            },
          },
        },
      },
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    404: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
