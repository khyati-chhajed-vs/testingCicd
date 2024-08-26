/**
 * File: update
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 18-07-2024
 * Description: Schema for updating notifications of given project ID and unit ID
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const UpdateNotificatonRequestSchema: FastifySchema = {
  description: 'API to mark all notifications as read',
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
  response: {
    204: {},
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
