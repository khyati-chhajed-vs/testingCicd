/**
 * File: user.dao
 * Author: manoj.fulara@vectoscalar.com
 * Date: 24-05-2024
 * Description: DAO for db operations related to tbl_users
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, Transaction } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class UserDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.UserModel!;
  }

  /**
   * Method to get transaction object
   * @returns Transaction obj
   */
  async getTransaction() {
    return SequelizeClient.sequelize.transaction();
  }

  /**
   * Method fetch user details for given user ID
   * @param user_id
   * @returns
   */
  async findByUserId(user_id: number) {
    logger.debug(`UserDAO -> findUserById :: fetching user details for user_id : ${user_id}`);
    return this.findById(this.model, user_id);
  }

  /**
   * Method fetch user details for given params
   * @param
   * @returns
   */

  async findByUserParams(params: any) {
    logger.debug(`UserDAO -> findByUserParams :: fetching user details for params : ${JSON.stringify(params)}}`);
    return this.findOne(this.model, { ...params });
  }

  /**
   * Method update user details for given user ID
   * @param user_id
   * @param request_body
   * @returns
   */
  async updateUser(user_id, request_body, transaction?: Transaction | null) {
    logger.debug(`UserDAO -> updateUser :: update user details for user_id : ${user_id}`);
    return this.model.update(request_body, { where: { user_id }, transaction });
  }
}
