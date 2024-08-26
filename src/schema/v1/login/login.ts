/**
 * File: login
 * Author: Akshiks Choudhary
 * Date: 25-07-2024
 * Description: Schema for login
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const LoginSchema: FastifySchema = {
  description: 'API for user login',
  tags: ['Login'],
  body: {
    type: 'object',
    properties: {
      user_email: {
        type: 'string',
      },
      user_mobile: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    required: ['password'],
    oneOf: [{ required: ['user_email'] }, { required: ['user_mobile'] }],
  },
  response: {
    200: {
      description: 'Successful login',
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
