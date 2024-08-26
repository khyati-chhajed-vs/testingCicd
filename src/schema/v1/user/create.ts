/**
 * File: createRequest
 * Author: AKSHIKA.CHOUDHARY
 * Date: 06-07-2024
 * Description: Schema for creating user
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const CreateUserRequestSchema: FastifySchema = {
  description: 'API to create user',
  tags: ['User'],
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        user_id: {
          type: 'number',
        },
        user_name: {
          type: 'string',
        },
        user_email: {
          type: 'string',
        },
        user_mobile: {
          type: 'string',
        },
      },
      required: ['user_name', 'user_email', 'user_mobile', 'user_id'],
    },
  },
  response: {
    201: {},
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
