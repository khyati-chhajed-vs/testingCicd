/**
 * File: create
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description: API schema to submit survey data for a project_id and unit_id
 */

import { FastifySchema } from 'fastify';
import { SURVEY_CATEGORY } from '../../../common/constants';
import { ErrorResponseSchema } from '../errorSchema';

export const SurveyRequestSchema: FastifySchema = {
  description: 'API to submit survey data',
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
  },
  body: {
    survey_data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question_id: { type: 'number' },
          answer: { type: ['string', 'number'] },
          category: { type: 'string' },
        },
        required: ['question_id', 'answer', 'category'],
        additionalProperties: false,
        if: {
          properties: {
            category: { const: SURVEY_CATEGORY.YES_NO },
          },
        },
        then: {
          properties: {
            answer: { type: 'string', enum: ['yes', 'no'] },
          },
        },
        else: {
          if: {
            properties: {
              category: { const: SURVEY_CATEGORY.RATING },
            },
          },
          then: {
            properties: {
              answer: { type: 'number', minimum: 1, maximum: 5 },
            },
          },
          else: {
            if: {
              properties: {
                category: { const: SURVEY_CATEGORY.TEXT },
              },
            },
            then: {
              properties: {
                answer: { type: 'string' },
              },
            },
            else: {
              properties: {
                answer: { type: 'string' }, // Default case
              },
            },
          },
        },
      },
    },
  },
  response: {
    201: {},
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    400: ErrorResponseSchema,
    404: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
