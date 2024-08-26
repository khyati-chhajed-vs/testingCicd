/**
 * File: inventory.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 12-07-2024
 * Description: Service to handle inventory API's logic
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { InventoryDAO } from '../dao';
import { logger } from '../common/services/logger.service';
import { GetInventoriesRequest } from '../types/v1';
import { FastifyRequest } from 'fastify';

@Service()
export class InventoryService extends BaseService {
  @Inject(InventoryDAO)
  private inventoryDAO!: InventoryDAO;

  /**
   * Method to get all inventories for given project ID and unit ID
   * @param request
   * @param reply
   */
  async getAll(request: FastifyRequest<GetInventoriesRequest>) {
    const { project_id, unit_id } = request.params;
    const { limit, offset } = request.query;
    try {
      const inventories: any = await this.inventoryDAO.getAll(project_id, unit_id, limit, offset);

      logger.debug(
        `InventoryService -> getAll : inventories for project_id ${project_id} and unit_id ${unit_id} is ${inventories}`,
      );

      return inventories ?? [];
    } catch (error) {
      logger.error(
        `InventoryService -> getAll : Failed to get inventories for project_id :${project_id} unit_id :${unit_id}, error: ${error}`,
      );

      throw error;
    }
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
    logger.info(
      `InventoryService -> getImages :: Fetching images of category inventories for project id : ${project_id}, unit id : ${unit_id}`,
    );
    return await this.inventoryDAO.getImages(project_id, unit_id, limit, offset);
  }
}
