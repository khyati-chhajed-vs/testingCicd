/**
 * File: laundry.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 24-05-2024
 * Description: Service to handle logic of Laundry's API
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { LAUNDRY_ERROR, HOURS_CONSTANTS } from '../common/constants';
import { BadRequestError } from '../common/exceptions/errors';
import { BaseService } from '../common/services/base.service';
import { DateUtils } from '../common/utils';
import { LaundryDAO } from '../dao';
import { GetLaundryRequest, LaundryDeleteRequest, LaundryPickupRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';

@Service()
export class LaundryService extends BaseService {
  @Inject(LaundryDAO)
  private laundryDao!: LaundryDAO;

  /**
   * Method to create laundry pickup request for given project ID and unit ID
   * @param body
   * @param params
   * @returns
   */
  async create(request: FastifyRequest<LaundryPickupRequest>) {
    const { params, body } = request;

    try {
      await this.checkDuplicateRequest(request);

      return await this.laundryDao.createLaundryRequest({
        ...body,
        user_id: request.decodedToken?.vianaar_uid,
        project_id: params.project_id,
        unit_id: params.unit_id,
        add_time: new Date(),
        tat_twenty_four: DateUtils.addHoursToDate(new Date(), HOURS_CONSTANTS.TWENTY_FOUR),
        tat_forty_eight: DateUtils.addHoursToDate(new Date(), HOURS_CONSTANTS.FORTY_EIGHT),
      });
    } catch (error) {
      logger.error(
        `LaundryService -> create :: Failed to create request, project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}, error : ${error}`,
      );

      throw error;
    }
  }

  /**
   * Method to check if another laundry pickup request already exist for given
   * project ID and unit ID
   * @param params
   */
  private async checkDuplicateRequest(request: FastifyRequest<LaundryPickupRequest>) {
    const { params } = request;

    logger.info(
      `LaundryService -> checkDuplicateRequest : Checking if laundry request already exist. project_id : ${params.project_id}, unit_id : ${params.unit_id}`,
    );

    const duplicateRequest = await this.laundryDao.findByRequestDateAndTime(request);

    if (duplicateRequest) {
      logger.error(
        `LaundryService -> checkDuplicateRequest : Laundry request exists. project_id : ${params.project_id}, unit_id : ${params.unit_id}`,
      );

      throw new BadRequestError(LAUNDRY_ERROR.ALREADY_EXISTS.CODE);
    }

    logger.info(
      `LaundryService -> checkDuplicateRequest : No duplicate request exist. project_id : ${params.project_id}, unit_id : ${params.unit_id} `,
    );
  }

  /**
   * Method to delete laundry pickup request
   * for given project ID, unit ID and request ID
   * @param request
   */
  async delete(request: FastifyRequest<LaundryDeleteRequest>) {
    try {
      const { params } = request;
      const [laundry] = await this.laundryDao.deleteRequest(request);

      if (!laundry) {
        logger.error(
          `LaundryService -> delete : Invalid Delete Request. project_id : ${params.project_id}, unit_id : ${params.unit_id} and request_id : ${params.request_id}`,
        );

        throw new BadRequestError(
          LAUNDRY_ERROR.BAD_REQUEST.CODE,
          LAUNDRY_ERROR.BAD_REQUEST.MESSAGE +
            ` project_id : ${params.project_id}, unit_id : ${params.unit_id}, request_id : ${params.request_id}`,
        );
      }
    } catch (error) {
      logger.error(
        `LaundryService -> delete :: Failed to delete laundry request, project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to fetch all the laundry request for given project ID and unit ID
   * @param request
   */
  async getLaundryHistory(request: FastifyRequest<GetLaundryRequest>) {
    try {
      const laundryRequests = await this.laundryDao.getLaundaryRequests(request);
      logger.debug(
        `LaundryService -> getLaundryHistory : laundry request for project_id ${request.params.project_id} and unit_id ${request.params.unit_id} is ${laundryRequests}`,
      );

      return laundryRequests || [];
    } catch (error) {
      logger.error(
        `LaundryService -> getLaundryHistory : Failed to get laundry requests for project_id :${request.params.project_id} unit_id :${request.params.unit_id}, error: ${error}`,
      );

      throw error;
    }
  }
}
