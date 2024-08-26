/**
 * File: get
 * Author: akshika.choudhary@vectoscalar.com
 * Date: 14-06-2024
 * Description: Schema to fetch complaints raised by customer
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetRaisedComplaintSchema: FastifySchema = {
  description: 'API to fetch raised complaints',
  tags: ['Complaint'],
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
    required: ['project_id', 'unit_id'],
  },
  querystring: {
    type: 'object',
    properties: {
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
          complaint_title: { type: 'string' },
          complaint_type_id: { type: 'number' },
          complaint_type: { type: 'string' },
          issue_id: { type: 'number' },
          issue_name: { type: 'string' },
          comments: { type: 'string' },
          request_status: { type: 'string' },
          file_url: { type: 'string' },
          add_time: { type: 'string' },
          escalation_description: { type: 'string' },
          admin_comments: { type: 'string' },
          is_escalated: { type: 'boolean' },
          escalate_counter: { type: 'number' },
          update_time: { type: 'string' },
        },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
