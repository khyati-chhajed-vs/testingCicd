/**
 * File: bookaStay.dao
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 06-06-2024
 * Description: DAO class for database operations
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, Op } from 'sequelize';

import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

import { REQUEST_STATUS, STATUS } from '../common/constants';
import { logger } from '../common/services/logger.service';

@Service()
export class BookAStayDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.BookAStayModel!;
  }

  /**
   * Method to create book a stay request for a given project_id and unit_id
   * @param project_id
   * @returns
   */
  async create(data) {
    logger.debug(`BookaStayDAO -> create :: creating book a stay request data : ${JSON.stringify(data)}`);
    return await this.model.create(data);
  }

  /**
   * Method to find active book a stay request for a given project_id and unit_id
   * @param project_id
   * @param unit_id
   * @returns
   */
  async findActiveRequest(project_id: number, unit_id: number) {
    logger.debug(
      `BookaStayDAO -> findActiveRequest :: finding any active book a stay request for project_id : ${project_id} unit_id : ${unit_id}`,
    );
    return await this.findOne(this.model, {
      project_id,
      unit_id,
      status: STATUS.ACTIVE,
      request_status: { [Op.in]: [REQUEST_STATUS.NOT_STARTED, REQUEST_STATUS.PROCESSING] },
    });
  }
}
