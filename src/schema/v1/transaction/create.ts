/**
 * File: create
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 22-07-2024
 * Description:API schema to create transaction
 */

import { FastifySchema } from 'fastify';

import { ErrorResponseSchema } from '../errorSchema';

export const createTransaction: FastifySchema = {
  description: 'API to create payment transaction ',
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
      demand_id: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    properties: {
      amount: { type: 'number' },
    },
    required: ['amount'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        transaction_id: {
          type: 'number',
        },
      },
    },
    400: ErrorResponseSchema,
    404: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
