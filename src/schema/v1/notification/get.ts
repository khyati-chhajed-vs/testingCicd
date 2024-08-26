/**
 * File: get
 * Author: AKSHIKA CHOUDHARY
 * Date: 18-07-2024
 * Description: Schema for fetching notifications
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetNotificatonResponseSchema: FastifySchema = {
  description: 'API to fetch notifications',
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
      limit: {
        type: 'number',
        default: 10,
      },
      offset: {
        type: 'number',
        default: 0,
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        unread_count: { type: 'integer' },
        notifications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              notification_heading: { type: 'string' },
              notification_comments: { type: 'string' },
              image_name: { type: 'string' },
              status: { type: 'string' },
              add_time: { type: 'string' },
              read_status: { type: 'string' },
            },
          },
        },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
