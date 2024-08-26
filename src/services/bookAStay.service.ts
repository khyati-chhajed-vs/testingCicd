/**
 * File: bookaStay.service
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 06-06-2024
 * Description:  This service class is responsible for handling business logic operations
 *               related to book a stay
 */

import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';

import { BookAStayDAO } from '../dao';
import { FastifyRequest } from 'fastify';
import { CreateBookAStayRequest, GetActiveBookAStayRequest } from '../types/v1';
import { BadRequestError } from '../common/exceptions/errors';
import { APPLICATION_NAME, BOOK_A_STAY_ERROR } from '../common/constants';
import { logger } from '../common/services/logger.service';
import { UnitService } from './unit.service';
import { DateUtils } from '../common/utils';

@Service()
export class BookAStayService extends BaseService {
  @Inject(BookAStayDAO)
  private bookAStayDAO!: BookAStayDAO;

  @Inject(UnitService)
  private unitService!: UnitService;

  /**
   * Method to create book a stay request for a given project_id and unit_id
   * @param request
   * @returns
   */
  async create(request: FastifyRequest<CreateBookAStayRequest>) {
    const { project_id, unit_id } = request.params;
    const { body } = request;

    try {
      this.validateCreateRequest(request);
      await this.checkDuplicate(request);
      const unitDetails = await this.unitService.getUnitDetais(unit_id);

      return await this.bookAStayDAO.create({
        ...body,
        user_email: request?.decodedToken?.email,
        user_mobile: request.decodedToken?.phone_number,
        unit_name: unitDetails?.unit_name,
        project_name: request.data?.unitAndProject?.project_name,
        user_full_name: request.decodedToken?.user_name,
        project_id: project_id,
        unit_id: unit_id,
        add_time: new Date(),
        add_by: APPLICATION_NAME,
        user_id: request.decodedToken?.vianaar_uid,
      });
    } catch (error) {
      logger.error(
        `BookaStayService -> create :: Request failed to create book a stay request. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to validate book a stay create request
   * @param request
   */
  private validateCreateRequest(request: FastifyRequest<CreateBookAStayRequest>) {
    const { body } = request;
    const check_in_date = DateUtils.getDateOnly(new Date(body.check_in_date));
    const check_out_date = DateUtils.getDateOnly(new Date(body.check_out_date));
    const current_date = DateUtils.getDateOnly(new Date());
    if (check_in_date < current_date || check_out_date < current_date || check_in_date > check_out_date) {
      logger.error(
        `BookAStayService->validateCreateRequest ::  Bad request check_in ,check_out dates should be in the future ,check_in date ${check_in_date} ,check_out date ${check_out_date} `,
      );
      throw new BadRequestError(BOOK_A_STAY_ERROR.INVALID_CHECK_IN_CHECK_OUT_DATES.CODE);
    }
  }

  /**
   * Method to check whether the book a stay request is duplicate or not for a given
   * project_id and unit_id
   * @param request
   */
  private async checkDuplicate(request: FastifyRequest<CreateBookAStayRequest>) {
    const { project_id, unit_id } = request.params;
    const { body } = request;

    logger.info(
      `BookaStayService -> checkDuplicate :: checking if book a stay request already exist for project id : ${project_id} and unit_id : ${unit_id}`,
    );

    const bookAStayRequest = await this.bookAStayDAO.findActiveRequest(project_id, unit_id);

    if (bookAStayRequest) {
      logger.error(
        `BookaStayService -> createRequest ::  duplicate book a stay request found for project_id : ${project_id}, unit_id : ${unit_id} and request_date :${body.check_in_date} , request_time :${body.check_out_date} `,
      );
      throw new BadRequestError(BOOK_A_STAY_ERROR.DUPLICATE_REQUEST.CODE);
    }
  }

  /**
   * Method to fetch book a stay active request for a given project_id and unit_id
   * @param request
   */
  async get(request: FastifyRequest<GetActiveBookAStayRequest>) {
    const { project_id, unit_id } = request.params;
    logger.debug(
      `BookAStayService -> get: fetch current active book a stay request for project_id : ${project_id} unit_id :${unit_id}`,
    );
    try {
      const bookAStayActiveRequest = await this.bookAStayDAO.findActiveRequest(project_id, unit_id);

      return bookAStayActiveRequest ?? {};
    } catch (error) {
      logger.error(`BookAStayService -> get : Failed to fetch book a stay active request, error: ${error}`);
      throw error;
    }
  }
}
