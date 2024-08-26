/**
 * File: uploadDocument
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 23-05-2024
 * Description: Schema for upload document API
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const uploadDocument: FastifySchema = {
  description: "API to upload user's documents",
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
    },
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 1 },
      category_id: { type: 'number' },
      document_url: { type: 'string' },
    },
    required: ['title', 'category_id', 'document_url'],
  },
  response: {
    201: {
      type: 'number',
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    409: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
