/**
 * File: generateHash
 * Author: MANOJ.FULARA
 * Date: 15-05-2024
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const generateHash: FastifySchema = {
  description: 'API to generate hash for payment transaction ',
  tags: ['Payment'],

  body: {
    type: 'object',
    properties: {
      hash_string_without_salt: { type: 'string' },
    },
    required: ['hash_string_without_salt'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        hash: {
          type: 'string',
        },
      },
    },
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
