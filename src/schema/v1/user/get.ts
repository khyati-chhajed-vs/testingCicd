/**
 * File: get
 * Author: manoj.fulara@vectoscalar.com
 * Date: 24-05-2024
 * Description: Schema for API to fetch user details
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetUserDetailsSchema: FastifySchema = {
  description: 'API to fetch user details',
  tags: ['User'],

  response: {
    200: {
      type: 'object',
      properties: {
        user_id: { type: 'number' },
        user_name: { type: 'string' },
        dob: { type: 'string', format: 'date' },
        user_email: { type: 'string' },
        user_mobile: { type: 'string' },
        user_address: { type: 'string' },
        add_time: { type: 'string' },
        add_by: { type: 'string' },
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
        },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    404: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
