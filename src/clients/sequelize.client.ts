/**
 * File: sequelize.client
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: intialize sequelize client.
 */

import { FastifyInstance } from 'fastify';
import { Sequelize } from 'sequelize';
import dbModels, { DBModels } from '../models/index';
import { logger } from '../common/services/logger.service';

export namespace SequelizeClient {
  export let sequelize: Sequelize;
  export let models: DBModels = {};

  export async function init(fastify: FastifyInstance) {
    sequelize = new Sequelize(
      fastify.config['SERVER_RDS_DB'],
      fastify.config['SERVER_RDS_USERNAME'],
      fastify.config['SERVER_RDS_PASSWORD'],
      {
        host: fastify.config['SERVER_RDS_HOST'],
        dialect: 'mysql',
        logging: (sql, options: any) => {
          logger.info(sql, options.bind);
        },
      },
    );

    Object.keys(dbModels).forEach((dbModel) => {
      models[dbModel] = dbModels[dbModel](sequelize);
    });

    await sequelize.authenticate().catch((error) => {
      fastify.log.error('Unable to connect to the database:' + error.message);
      throw error;
    });
  }
}
