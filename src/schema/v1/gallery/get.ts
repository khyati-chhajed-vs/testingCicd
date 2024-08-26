/**
 * File: get
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 11-06-2024
 * Description: Schema for get api of gallery for given project ID and unit ID
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
import { IMAGE_CATEGORY } from '../../../common/constants';

export const GetGalleryResponseSchema: FastifySchema = {
  description: 'API to fetch gallery images',
  tags: ['Gallery'],
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
      category: {
        type: 'string',
        enum: Object.values(IMAGE_CATEGORY),
      },
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
          date: { type: 'string', format: 'date' },
          images: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                url: { type: 'string' },
              },
              required: ['title', 'url'],
            },
          },
        },
        required: ['date', 'images'],
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
