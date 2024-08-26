/**
 * File: siteVisitRequest.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 26-05-2024
 * Description: Controller for Site visit request APIs
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, DELETE, GET, Inject, POST } from 'fastify-decorators';

import {
  BASE_ENDPOINT,
  STATUS_CODES,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  SITE_VISIT_REQUEST_ENDPOINT,
  REQUEST_ID_ENDPOINT,
} from '../../common/constants';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { DeleteSiteVisitRequestSchema, GetSiteVisitRequestSchema, SiteVisitRequestSchema } from '../../schema/v1';
import { SiteVisitRequestService } from '../../services';
import { DeleteSiteVisitRequest, GetSiteVisitRequest, SiteVisitRequest } from '../../types/v1';
import { AuthController } from '../../common/controllers/auth.controller';
import { logger } from '../../common/services/logger.service';

@Controller({
  route:
    BASE_ENDPOINT +
    PROJECT_ENDPOINT +
    PROJECT_ID_ENDPOINT +
    UNIT_ENDPOINT +
    UNIT_ID_ENDPOINT +
    SITE_VISIT_REQUEST_ENDPOINT,
})
export default class SiteVisitRequestController extends AuthController {
  @Inject(SiteVisitRequestService)
  private siteVisitRequestService!: SiteVisitRequestService;

  /**
   * API to create site visit request for given project ID and unit ID
   * @param request
   * @param reply
   */
  @POST('', {
    schema: SiteVisitRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateOngoingProjectAndUnit],
  })
  async create(request: FastifyRequest<SiteVisitRequest>, reply: FastifyReply) {
    logger.info(
      `SiteVisitRequestController -> create :: Request to create site visite request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    const siteVisitRequest = await this.siteVisitRequestService.create(request);

    logger.info(
      `SiteVisitRequestController -> create :: Successfully created site visite request for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}. requestId : ${siteVisitRequest.id}`,
    );

    reply.status(STATUS_CODES.CREATED).send(siteVisitRequest.id);
  }

  /**
   * API to get site visit request for given project ID and unit ID
   * @param request {GetSiteVisitRequest}
   * @param reply
   */

  @GET('', {
    schema: GetSiteVisitRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateOngoingProjectAndUnit],
  })
  async get(request: FastifyRequest<GetSiteVisitRequest>, reply: FastifyReply) {
    logger.info(
      `SiteVisitRequestController -> get :: Request to get site visite requests for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.siteVisitRequestService.get(request));
  }

  /**
   * API to delete site visit request for given request ID, project ID and unit ID
   * @param request
   * @param reply
   */
  @DELETE(REQUEST_ID_ENDPOINT, {
    schema: DeleteSiteVisitRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateOngoingProjectAndUnit],
  })
  async delete(request: FastifyRequest<DeleteSiteVisitRequest>, reply: FastifyReply) {
    logger.info(
      `SiteVisitRequestController -> delete :: Request to delete site visite request for request_id : ${request.params.request_id}, project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    await this.siteVisitRequestService.delete(request);

    logger.info(
      `SiteVisitRequestController -> delete :: Successfully delete site visit request for request_id : ${request.params.request_id}, project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.NO_CONTENT);
  }
}
