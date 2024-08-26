/**
 * File: index
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: intializes fastify client.
 */

import { SequelizeClient } from './sequelize.client';
import { FastifyInstance } from 'fastify';

export const initializeClients = async (fastify: FastifyInstance) => {
  await SequelizeClient.init(fastify);
};

export * from './sequelize.client';
