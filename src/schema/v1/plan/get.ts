/**
 * File: get
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 11-06-2024
 * Description: Schema for get api of plan details
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetPlanDetails: FastifySchema = {
  description: 'API to fetch plan details for given project_id and unit id',
  tags: ['Plans'],
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
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          image_url: { type: 'string' },
        },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
