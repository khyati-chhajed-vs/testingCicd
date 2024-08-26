/**
 * File: inventory.dao
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 12-07-2024
 * Description: DAO service to handle database request of tbl_inventory.
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';

import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class InventoryDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.InventoryModel!;
  }

  /**
   * Method to get all inventories of given unit ID and project ID
   * @param project_id
   * @param unit_id
   * @returns
   */
  async getAll(project_id: number, unit_id: number, limit: number, offset: number) {
    return await this.model.findAll({
      where: {
        project_id,
        unit_id,
      },
      limit,
      offset: limit * offset,
      attributes: ['id', 'item_name', 'image_url', 'comment', 'status', 'add_time', 'update_time'],
    });
  }

  /**
   * Method to get images for given project ID and unit ID
   * @param project_id
   * @param unit_id
   * @param limit
   * @param offset
   * @returns
   */
  async getImages(project_id: number, unit_id: number, limit: number, offset: number) {
    const query = `
      SELECT
        DATE(add_time) as add_time,
        image_url,
        item_name as title
      FROM
        tbl_inventory
      WHERE
        project_id = ? AND unit_id = ?
      ORDER BY add_time DESC
      LIMIT ? offset ?
    `;
    return await this.executeQueryWithParam({ query, bindParams: [project_id, unit_id, limit, limit * offset] });
  }
}
