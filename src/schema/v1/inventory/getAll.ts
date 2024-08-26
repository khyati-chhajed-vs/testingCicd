/**
 * File: getAll
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 12-07-2024
 * Description: Schema to fetch all inventories of given project ID and unit ID
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const InventoryResponseSchema: FastifySchema = {
  description: 'API to fetch inventories',
  tags: ['Inventory'],
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
          id: { type: 'integer' },
          item_name: { type: 'string' },
          image_url: { type: 'string' },
          comment: { type: 'string' },
          status: { type: 'string' },
          add_time: { type: 'string', format: 'date-time' },
          update_time: { type: 'string', format: 'date-time' },
          comment_add_time: { type: 'string' },
        },
      },
    },
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
