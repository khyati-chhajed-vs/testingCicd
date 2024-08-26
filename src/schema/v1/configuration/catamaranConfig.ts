/**
 * File: catamaranConfig
 * Author: akshika.choudhary@vectoscalar.com
 * Date: 11-06-2024
 * Description: Schema for fetching catamaran configuration
 */
import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetCatamaranConfigSchema: FastifySchema = {
  description: 'API to fetch configuration for catamaran',
  tags: ['Config'],
  response: {
    200: {
      type: 'object',
      properties: {
        no_of_pax: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              key: { type: 'string' },
              value: { type: 'number' },
              cost: { type: 'number' },
            },
          },
        },
        questions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              answer: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    key: { type: 'string' },
                    value: { type: 'string' },
                  },
                },
              },
              question: { type: 'string' },
            },
          },
        },
        disclaimer: { type: 'array', items: { type: 'string' } },
        is_request_generation_flow: { type: 'boolean' },
        terms_and_conditions: { type: 'string' },
        prior_booking_time: { type: 'number' },
        slots: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              slot: { type: 'string' },
            },
          },
        },
      },
    },
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    404: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
