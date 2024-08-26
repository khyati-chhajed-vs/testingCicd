/**
 * File: config
 * Author: akshika.choudhary@vectoscalar.com
 * Date: 28-05-2024
 * Description: Schema for fetching \configuration details
 */

import { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../errorSchema';
export const GetAppConfigSchema: FastifySchema = {
  description: 'API to fetch app configurations data including welcome videos and document categories',
  tags: ['Config'],
  response: {
    200: {
      type: 'object',
      properties: {
        android_min_version: { type: 'string' },
        android_max_version: { type: 'string' },
        ios_min_version: { type: 'string' },
        ios_max_version: { type: 'string' },
        furnish_my_property_url: { type: 'string' },
        sustainability_url: { type: 'string' },
        bluekite_url: { type: 'string' },
        airport_prior_booking_time: { type: 'string' },
        max_survey_retries: { type: 'number' },
        laundry_service_time: { type: 'string' },
        site_visit_prior_booking_time: { type: 'string' },
        airport_disclaimer: { type: 'array' },
        laundry_disclaimer: { type: 'array' },
        site_visit_disclaimer: { type: 'array' },
        block_date_disclaimer: { type: 'array' },
        pre_hamburger_menu: { type: 'array', items: { type: 'string' } },
        post_hamburger_menu: { type: 'array', items: { type: 'string' } },
        block_date_prior_booking_time: { type: 'string' },
        welcome_video_skip_duration: { type: 'number' },
        escalation_start_time: { type: 'number' },
        escalation_end_time: { type: 'number' },
        account_details: { type: 'array' },
        airport_details: { type: 'array' },
        bluekite_locations: { type: 'array' },
        airport_terms_and_conditions: { type: 'string' },
        max_file_size: { type: 'number' },
        book_a_stay_prior_booking_time: { type: 'string' },
        welcome_videos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              project_status: { type: 'string' },
              video_name: { type: 'string' },
            },
          },
        },
        document_categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              category_name: { type: 'string' },
            },
          },
        },
        recommendation_categories: {
          type: 'array',
          items: {
            type: 'object',
            required: ['category_id', 'category_name', 'areas'],
            properties: {
              category_id: { type: 'integer' },
              category_name: { type: 'string' },
              areas: {
                type: ['array', 'null'],
                items: {
                  type: 'object',
                  required: ['area_id', 'area_name'],
                  properties: {
                    area_id: { type: ['integer', 'null'] },
                    area_name: { type: ['string', 'null'] },
                  },
                },
              },
            },
          },
        },
        cleaning_type: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
    400: ErrorResponseSchema,
    403: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
