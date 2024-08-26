/**
 * File: get
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 19-07-2024
 * Description: API schema for fetching user pending demand payments
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
import { DEMAND_TYPE } from '../../../common/constants';
export const GetPendingPaymentSchema: FastifySchema = {
  description: 'API to fetch user demand payments',
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
    },
  },
  querystring: {
    type: 'object',
    properties: {
      demand_type: { type: 'string', enum: [...Object.values(DEMAND_TYPE)] },
      limit: { type: 'number', default: 10 },
      offset: { type: 'number', default: 0 },
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
          remark: { type: 'string' },
          total_amount: { type: 'number' },
          amount_to_be_paid: { type: 'number' },
          interest_amount: { type: 'number', default: 0 }, //TODO :remove interest amount default value
          payment_status: { type: 'string' },
          is_interest_waived: { type: 'boolean' },
          add_by: { type: 'string' },
          payment_due_date: { type: 'string' },
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
