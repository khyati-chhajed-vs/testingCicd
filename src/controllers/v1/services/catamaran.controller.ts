/**
 * File: catamaran.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 04-06-2024
 * Description: Controller for APIs related to catamaran
 */

import { Controller, DELETE, GET, Inject, POST } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../../common/services/logger.service';
import {
  BASE_ENDPOINT,
  STATUS_CODES,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  CATAMARAN_ENDPOINT,
  REQUEST_ID_ENDPOINT,
} from '../../../common/constants';
import {
  CreateCatamaranRequestSchema,
  DeleteCatamaranRequestSchema,
  GetAllCatamaranRequestSchema,
} from '../../../schema/v1';
import { CatamaranService } from '../../../services';
import { BaseController } from '../../../common/controllers/base.controller';
import { CreateCatamaranRequest, DeleteCatamaranRequest, GetCatamaranRequest } from '../../../types/v1';
import ProjectAndUnitMiddleWare from '../../../common/middlewares/projectAndUnit.middleware';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + CATAMARAN_ENDPOINT,
})
export default class CatamaranController extends BaseController {
  @Inject(CatamaranService)
  private catamaranService!: CatamaranService;

  /**
   * API to fetch all catamaran request for given
   * project ID and unit ID
   * @param request
   * @param reply
   */
  @GET('', { schema: GetAllCatamaranRequestSchema, preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit] })
  async fetchAllRequest(request: FastifyRequest<GetCatamaranRequest>, reply: FastifyReply) {
    logger.info(
      `CatamaranController -> fetchAllRequest :: Request to fetch all catamaran request for project_id : ${request.params.project_id}, unit_id: ${request.params.unit_id}`,
    );

    const catamaranRequests = await this.catamaranService.fetchAllRequest(request);

    logger.info(
      `CatamaranController -> fetchAllRequest :: Successfully fetched all catamaran request for project_id : ${request.params.project_id}, unit_id: ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(catamaranRequests);
  }

  /**
   * API to cancel catamaran request for given request ID,
   * project ID and unit ID
   * @param request
   * @param reply
   */
  @DELETE(REQUEST_ID_ENDPOINT, {
    schema: DeleteCatamaranRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async deleteRequest(request: FastifyRequest<DeleteCatamaranRequest>, reply: FastifyReply) {
    logger.info(
      `CatamaranController -> fetchAllRequest :: Request to delete catamaran request for project_id : ${request.params.project_id}, unit_id: ${request.params.unit_id} and request_id :${request.params.request_id}`,
    );

    await this.catamaranService.deleteRequest(request);

    logger.info(
      `CatamaranController -> fetchAllRequest :: Successfully deleted catamaran request for project_id : ${request.params.project_id}, unit_id: ${request.params.unit_id}, request_id : ${request.params.request_id}`,
    );

    reply.status(STATUS_CODES.NO_CONTENT);
  }

  /**
   * API to create catamaran request for given
   * project ID and unit ID
   * @param request
   * @param reply
   */
  @POST('', {
    schema: CreateCatamaranRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async createRequest(request: FastifyRequest<CreateCatamaranRequest>, reply: FastifyReply) {
    logger.info(
      `CatamaranController -> fetchAllRequest :: Request to create catamaran request for project_id : ${request.params.project_id}, unit_id: ${request.params.unit_id}`,
    );

    const catamaranRequest = await this.catamaranService.createRequest(request);

    logger.info(
      `CatamaranController -> fetchAllRequest :: Successfully created catamaran request for project_id : ${request.params.project_id}, unit_id: ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.CREATED).send(catamaranRequest.id);
  }
}
