import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
import { SERVICE_REQUEST_STATUS } from '../../../common/constants';
export const GetUserProjectsResponseSchema: FastifySchema = {
  description: 'API for fetching all project details for a user',
  tags: ['Project'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          project_id: { type: 'number' },
          project_name: { type: 'string' },
          unit_id: { type: 'number' },
          smoobu_id: { type: 'number' },
          survey_status: { type: 'string' },
          survey_postpone_count: { type: 'number' },
          device_id: { type: 'array' },
          unit_name: { type: 'string' },
          project_status: { type: 'string' },
          is_rental_enabled: { type: 'boolean' },
          project_address: { type: 'string' },
          project_image: { type: 'string' },
          project_type: { type: 'string' },
          add_time: { type: 'string' },
          furnish_property_status: { type: 'string', enum: [...Object.values(SERVICE_REQUEST_STATUS)] },
          rental_request_status: { type: 'string', enum: [...Object.values(SERVICE_REQUEST_STATUS)] },
          property_update_notification: { type: 'boolean' },
        },
      },
    },

    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
