/**
 * File: bookaStay.controller
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 06-06-2024
 * Description: Controller for Book a stay related APIs
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, Inject, POST, GET } from 'fastify-decorators';

import {
  BASE_ENDPOINT,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  STATUS_CODES,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  BOOK_A_STAY_ENDPOINT,
} from '../../common/constants';
import { AuthController } from '../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { CreateBookaStaySchema, getActiveRequestSchema } from '../../schema/v1';
import { BookAStayService } from '../../services';
import { CreateBookAStayRequest, GetActiveBookAStayRequest } from '../../types/v1';
import { logger } from '../../common/services/logger.service';

@Controller({
  route:
    BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + BOOK_A_STAY_ENDPOINT,
})
export default class BookAStayController extends AuthController {
  @Inject(BookAStayService)
  private bookAStayService!: BookAStayService;

  /**
   * API to create book a stay request for a given project_id and unit_id
   * @param request
   * @param reply
   */
  @POST('', {
    schema: CreateBookaStaySchema,
    preHandler: [ProjectAndUnitMiddleWare.validateOngoingProjectAndUnit],
  })
  async create(request: FastifyRequest<CreateBookAStayRequest>, reply: FastifyReply) {
    logger.info(
      `BookAStayController -> create :: Request to create book a stay request for project_id : ${request.params.project_id}`,
    );

    const bookAStayResponse: any = await this.bookAStayService.create(request);

    logger.info(
      `BookAStayController -> create :: created book a stay request with id : ${bookAStayResponse?.id} for project_id : ${request.params.project_id}`,
    );

    reply.status(STATUS_CODES.CREATED).send(bookAStayResponse);
  }

  /*
   * API to get active book a stay request for a given project_id and unit_id
   * @param request
   * @param reply
   */
  @GET('', {
    schema: getActiveRequestSchema,
    preHandler: [ProjectAndUnitMiddleWare.validateOngoingProjectAndUnit],
  })
  async get(request: FastifyRequest<GetActiveBookAStayRequest>, reply: FastifyReply) {
    logger.info(
      `BookAStayController -> get :: Request to get current active book a stay request for project_id : ${request.params.project_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.bookAStayService.get(request));
  }
}
