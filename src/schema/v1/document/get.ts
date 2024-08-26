/**
 * File: get
 * Author: manoj.fulara@vectoscalar.com
 * Date: 06-05-2024
 * Description: API schema to fetch all the project related documents for a given user
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetDocumentSchema: FastifySchema = {
  description: 'API to fetch user`s documents',
  tags: ['Document'],
  params: {
    type: 'object',
    properties: {
      project_id: {
        type: 'number',
      },
      unit_id: {
        type: 'number',
      },
      category_id: {
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
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              document_url: { type: 'string' },
              add_by: { type: 'string' },
              add_time: { type: 'string' },
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
