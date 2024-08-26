/**
 * File: update
 * Author: AKSHIKA.CHOUDHARY
 * Date: 12-07-2024
 * Description: Schema to update project progress
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
import { SERVICE_REQUEST_STATUS } from '../../../common/constants';

export const UpdateProjectSchema: FastifySchema = {
  description: 'API to update project',
  tags: ['Project'],
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
  body: {
    type: 'object',
    oneOf: [
      {
        properties: {
          furnish_property_status: { type: 'string', enum: [SERVICE_REQUEST_STATUS.PROCESSING] },
        },
        required: ['furnish_property_status'],
      },
      {
        properties: {
          device_id: { type: 'array', items: { type: 'string' } },
        },
        required: ['device_id'],
      },
      {
        properties: {
          rental_request_status: { type: 'string', enum: [SERVICE_REQUEST_STATUS.PROCESSING] },
        },
        required: ['rental_request_status'],
      },
      {
        properties: {
          survey_postpone_count: { type: 'number' },
        },
        required: ['survey_postpone_count'],
      },
      {
        properties: {
          property_update_notification: { type: 'boolean' },
        },
        required: ['property_update_notification'],
      },
    ],
  },
  response: {
    204: {},
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
