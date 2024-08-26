/**
 * File: getMISSummary
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-07-2024
 * Description: Schema for fetch api of MIS details
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetMISSummaryResponseSchema: FastifySchema = {
  description: 'API to fetch MIS summary details of the given unit in the given project',
  tags: ['Cleaning'],
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
        month: { type: 'string' },
        year: { type: 'number' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              total_days: {
                type: 'number',
              },
              cleaning_type: {
                type: 'string',
              },
              heading: {
                type: 'string',
              },
              sub_heading_name: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
