/**
 * File: get
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 29-05-2024
 * Description: Schema for fetching category wise recommendations
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetRecommendationsResponseSchema: FastifySchema = {
  description: 'API to fetch Recommendations',
  tags: ['Explore Goa'],
  params: {
    type: 'object',
    properties: {
      category_id: {
        type: 'number',
      },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      area_id: { type: 'number' },
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
          recommendation_id: { type: 'integer' },
          area_id: { type: ['integer', 'null'] },
          area_name: { type: ['string', 'null'] },
          category_id: { type: ['integer', 'null'] },
          category_name: { type: ['string', 'null'] },
          recommendation_name: { type: ['string', 'null'] },
          home_delivery: { type: ['string', 'null'] },
          show_monsoon: { type: ['string', 'null'] },
          recommendation_phone: { type: ['string', 'null'] },
          tie_up: { type: ['string', 'null'] },
          address: { type: ['string', 'null'] },
          description: { type: ['string', 'null'] },
          image_name: { type: ['string', 'null'] },
          url_key: { type: ['string', 'null'] },
          location_url: { type: ['string', 'null'] },
          add_by: { type: ['string', 'null'] },
          add_time: { type: 'string', format: 'date-time' },
        },
      },
    },
    400: ErrorResponseSchema,
    403: ErrorResponseSchema,
    401: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
