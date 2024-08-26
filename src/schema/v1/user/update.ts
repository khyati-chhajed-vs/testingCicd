/**
 * File: update
 * Author: AKSHIKA.CHOUDHARY
 * Date: 15-07-2024
 * Description: Schema to update user
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const UpdateUserSchema: FastifySchema = {
  description: 'API to update user',
  tags: ['User'],
  body: {
    type: 'object',
    properties: {
      notification_settings: {
        type: 'object',
        properties: {
          account_update: { type: 'boolean' },
          document_update: { type: 'boolean' },
          vianaar_support: { type: 'boolean' },
          payment_update: { type: 'boolean' },
          my_maintenance: { type: 'boolean' },
          revenue: { type: 'boolean' },
        },
        required: [
          'account_update',
          'document_update',
          'vianaar_support',
          'payment_update',
          'my_maintenance',
          'revenue',
        ],
      },
    },
    required: ['notification_settings'],
  },
  response: {
    201: {
      type: 'number',
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
