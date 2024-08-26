/**
 * File: get
 * Author: AKSHIKA.CHOUDHARY
 * Date: 17-06-2024
 * Description: Schema for fetching complaint types and their associated active issues
 *
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetComplaintTypesResponseSchema: FastifySchema = {
  description: 'API to fetch complaint types and their associated active issues',
  tags: ['Complaint'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          complaint_type_id: { type: 'string' },
          complaint_name: { type: 'string' },
          issues: {
            type: ['array', 'null'],
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
    400: ErrorResponseSchema,
    404: ErrorResponseSchema,
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
