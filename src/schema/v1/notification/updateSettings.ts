import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const UpdateNotificatonSettingsSchema: FastifySchema = {
  description: 'API to update notifications settings',
  tags: ['Notification'],
  querystring: {
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
      revenue: { type: 'boolean' },
      account_update: { type: 'boolean' },
      my_maintenance: { type: 'boolean' },
      payment_update: { type: 'boolean' },
      document_update: { type: 'boolean' },
      vianaar_support: { type: 'boolean' },
      property_update_notification: { type: 'boolean' },
    },
  },
  response: {
    204: {},
    400: ErrorResponseSchema,
    404: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
