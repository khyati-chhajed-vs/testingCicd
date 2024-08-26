/**
 * File: get
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 23-07-2024
 * Description: schema to fetch demand payment transaction
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetTransactionSchema: FastifySchema = {
  description: 'API to fetch demand payment transaction',
  tags: ['Payment'],
  params: {
    type: 'object',
    properties: {
      project_id: {
        type: 'number',
      },
      unit_id: {
        type: 'number',
      },
      demand_id: {
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
          demand_type: { type: 'string' },
          description: { type: 'string' },
          amount: { type: 'number' },
          payment_status: { type: 'string' },
          add_time: { type: 'string' },
        },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
