/**
 * File: inventory.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 12-07-2024
 * Description: Controller for API's handling request related to property's Inventory
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject } from 'fastify-decorators';

import {
  BASE_ENDPOINT,
  INVENTORIES_ENDPOINT,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  STATUS_CODES,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
} from '../../common/constants';
import { AuthController } from '../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { InventoryResponseSchema } from '../../schema/v1';
import { InventoryService } from '../../services';
import { logger } from '../../common/services/logger.service';
import { GetInventoriesRequest } from '../../types/v1';

@Controller({
  route:
    BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + INVENTORIES_ENDPOINT,
})
export default class InventoryController extends AuthController {
  @Inject(InventoryService)
  private inventoryService!: InventoryService;

  /**
   * API to fetch inventories for given project ID and unit ID
   * @param request
   * @param reply
   */
  @GET('', {
    schema: InventoryResponseSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async getAll(request: FastifyRequest<GetInventoriesRequest>, reply: FastifyReply) {
    logger.info(
      `InventoryController -> getAll :: Request to fetch inventories of project_id : ${request.data.project_id} and unit_id : ${request.data.unit_id}`,
    );

    const inventories = await this.inventoryService.getAll(request);

    logger.info(
      `InventoryController -> getAll :: Inventories fetched successfully. project_id : ${request.data.project_id}, unit_id : ${request.data.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(inventories);
  }
}
