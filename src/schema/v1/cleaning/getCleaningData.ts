/**
 * File: getCleaningData
 * Author: akshika.choudhary@vectoscalar.com
 * Date: 31-05-2024
 * Description: Schema for fetch api of cleaning details
 */

import { FastifySchema } from 'fastify';

export const GetCleaningResponseSchema: FastifySchema = {
  description: 'API to fetch cleaning details of the given unit in the given project',
  tags: ['Cleaning'],
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
      year: {
        type: 'number',
      },
      month: {
        type: 'number',
        minimum: 1, // Minimum month is 1
        maximum: 12, // Maximum month is 12
      },
      cleaning_type_id: {
        type: 'number',
      },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            format: 'date',
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                time: {
                  type: 'string',
                  format: 'time',
                },
                heading: {
                  type: 'string',
                },
                sub_heading: {
                  type: 'string',
                },
                images_urls: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                cleaning_type: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    400: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        code: {
          type: 'string',
        },
      },
    },
    401: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        code: {
          type: 'string',
        },
      },
    },
    403: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        code: {
          type: 'string',
        },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        code: {
          type: 'string',
        },
      },
    },
  },
};
