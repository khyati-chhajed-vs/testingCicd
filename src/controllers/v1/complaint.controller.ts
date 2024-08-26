/**
 * File: complaint.controller
 * Author: AKSHIKA.CHOUDHARY
 * Date: 14-06-2024
 */

import { Controller, GET, Inject, PATCH, POST } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BASE_ENDPOINT, STATUS_CODES } from '../../common/constants/common.constant';
import {
  GetComplaintTypesResponseSchema,
  GetRaisedComplaintSchema,
  ComplaintRequestSchema,
  ComplaintEscalationSchema,
} from '../../schema/v1';
import { ComplaintService } from '../../services';
import {
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  RAISED_COMPLAINT_ENDPOINT,
  COMPLAINT_TYPES_ENDPOINT,
  COMPLAINT_ID_ENDPOINT,
} from '../../common/constants';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { ComplaintEscalationRequest, ComplaintRequest, GetComplaintRequest } from '../../types/v1';
import { logger } from '../../common/services/logger.service';
import { AuthController } from '../../common/controllers/auth.controller';

@Controller({
  route: BASE_ENDPOINT,
})
export default class ComplaintController extends AuthController {
  @Inject(ComplaintService)
  private complaintService!: ComplaintService;

  /**
   *  API retrieves user complaints based on the provided project_id and unit_id
   * @param request
   * @param reply
   */
  @GET(PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + RAISED_COMPLAINT_ENDPOINT, {
    schema: GetRaisedComplaintSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async get(request: FastifyRequest<GetComplaintRequest>, reply: FastifyReply) {
    logger.info(`ComplaintController -> get :: Request to fetch complaints raised by customer`);

    reply.status(STATUS_CODES.SUCCESS).send(await this.complaintService.fetchRaisedComplaints(request));
  }

  /**
   *  API retrieves complaint types and their associated active issues
   * @param request
   * @param reply object[]
   */

  @GET(COMPLAINT_TYPES_ENDPOINT, {
    schema: GetComplaintTypesResponseSchema,
  })
  async getComplaintTypes(request: FastifyRequest, reply: FastifyReply) {
    logger.info(
      `ComplaintController -> getComplaintTypesAndIssues :: Request to fetch complaint types and their associated active issues`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.complaintService.fetchComplaintsTypes());
  }
  /**
   * API to raise a ticket for given project ID and unit ID
   * @param request
   * @param reply
   */

  @POST(PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + RAISED_COMPLAINT_ENDPOINT, {
    schema: ComplaintRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
  })
  async create(request: FastifyRequest<ComplaintRequest>, reply: FastifyReply) {
    logger.info(
      `ComplaintController -> create :: Request to raise complaint for project_id : ${request.params.project_id} and unit_id : ${request.params.unit_id}`,
    );

    const complaint_id = await this.complaintService.create(request);

    logger.info(
      `ComplaintController -> create :: Successfully created documents for project_id : ${request.params.project_id} and unit_id ${request.params.unit_id}. Complaint ID : ${complaint_id}`,
    );

    reply.status(STATUS_CODES.CREATED).send(complaint_id);
  }

  /**
   * API to escalate complaints ticket for given project_id and unit_id
   * @param request
   * @param reply
   */
  @PATCH(
    PROJECT_ENDPOINT +
      PROJECT_ID_ENDPOINT +
      UNIT_ENDPOINT +
      UNIT_ID_ENDPOINT +
      RAISED_COMPLAINT_ENDPOINT +
      COMPLAINT_ID_ENDPOINT,
    {
      schema: ComplaintEscalationSchema,
      preHandler: [ProjectAndUnitMiddleWare.validateCompletedProjectAndUnit],
    },
  )
  async escalate(request: FastifyRequest<ComplaintEscalationRequest>, reply: FastifyReply) {
    logger.info(
      `ComplaintController -> escalate :: Request to escalate complaint for project_id : ${request.params.project_id} and unit_id : ${request.params.unit_id}`,
    );

    await this.complaintService.escalate(request);

    reply.status(STATUS_CODES.NO_CONTENT);
  }
}
