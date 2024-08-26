/**
 * File: fetch.ts
 * Author: akshika.choudhary
 * Date: 24-05-2024
 * Description: Schema for api to fetch team details based on project_id
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const getTeamResponseSchema: FastifySchema = {
  description: 'API to fetch team details for given project id',
  tags: ['Project'],
  params: {
    type: 'object',
    properties: {
      project_id: {
        type: 'number',
      },
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
          designation: { type: 'string' },
          image_url: { type: 'string' },
          phone_number: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
