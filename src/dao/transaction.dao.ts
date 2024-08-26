/**
 * File: transaction.dao
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 22-07-2024
 * Description: DAO service for payment transaction related db operations
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';
//import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class TransactionDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.TransactionModel!;
  }

  /**
   * Method to create transaction record of demand payment
   * @param param0
   */
  async createTransaction(data: any) {
    return await this.create(this.model, data);
  }

  /**
   * Method to create transaction record of demand payment
   * @param param0
   */
  async get(project_id: number, unit_id: number, demand_id: number) {
    const query = `SELECT transaction.id,transaction.payment_status,transaction.description,
    transaction.amount,transaction.payment_status,transaction.created_at add_time,demands.demand_type
    FROM tbl_transaction  transaction JOIN
     tbl_demands demands ON demands.id = transaction.demand_id WHERE project_id =? AND demands.id =?  AND unit_id =?  ORDER BY transaction.id DESC `;

    return await this.executeQueryWithParam({ query, bindParams: [project_id, demand_id, unit_id] });
  }
}
