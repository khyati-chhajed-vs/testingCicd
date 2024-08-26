/**
 * File: getProjectProgress
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 11-06-2024
 * Description: API schema to fetch project progress for a project_id
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';

export const GetProjectProgressSchema: FastifySchema = {
  description: 'API for fetching all project details for a user',
  tags: ['Project'],
  response: {
    200: {
      type: 'object',
      properties: {
        progressdata: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              images: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    image_url: {
                      type: 'string',
                    },
                    image_date: {
                      type: 'string',
                    },
                  },
                  required: ['image_url', 'image_date'],
                },
              },
            },
            required: ['title', 'images'],
          },
        },
      },
      required: ['progressdata'],
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
