/**
 * File: catamaran.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 04-06-2024
 * Description: Service to handle logic of catamaran APIs
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { CatamaranDAO } from '../dao';
import { CreateCatamaranRequest, DeleteCatamaranRequest, GetCatamaranRequest } from '../types/v1';
import { FastifyRequest } from 'fastify';
import { BadRequestError } from '../common/exceptions/errors';
import { CATAMARAN_ERROR, PRIOR_BOOKING_TIME } from '../common/constants';
import { DateUtils } from '../common/utils';
import { logger } from '../common/services/logger.service';
import { CatamaranConfigService } from './catamaranConfig.service';

@Service()
export class CatamaranService extends BaseService {
  @Inject(CatamaranDAO)
  private catamaranDAO!: CatamaranDAO;

  @Inject(CatamaranConfigService)
  private catamaranConfigService!: CatamaranConfigService;

  /**
   * Method to fetch catamran request history
   * for given project ID and unit ID
   * @param request
   * @returns
   */
  async fetchAllRequest(request: FastifyRequest<GetCatamaranRequest>) {
    try {
      const catamaranRequests = await this.catamaranDAO.fetchAllRequest(request);

      logger.debug(
        `CatamaranService -> fetchAllRequest : fetched catamaran request history for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}. Request details are : ${catamaranRequests}`,
      );

      return catamaranRequests ?? [];
    } catch (error) {
      logger.error(`CatamaranService -> fetchAllRequest : Failed to fecth catamaran request details. error: ${error}`);

      throw error;
    }
  }

  /**
   * Method to delete catamran request
   * for given request ID, project ID and unit ID
   * @param request
   * @returns
   */
  async deleteRequest(request: FastifyRequest<DeleteCatamaranRequest>) {
    try {
      const [catamaranRequests] = await this.catamaranDAO.deleteRequest(request);
      if (!catamaranRequests) {
        logger.error(
          `LaundryService -> delete : Invalid Delete Request. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id} and request_id : ${request.params.request_id}`,
        );

        throw new BadRequestError(CATAMARAN_ERROR.NOT_FOUND.CODE);
      }
    } catch (error) {
      logger.error(
        `CatamaranService -> fetchAllRequest : Failed to delete catamaran request for request_id : ${request.params.request_id}. error: ${error}`,
      );

      throw error;
    }
  }

  /**
   * Method to create catamran request
   * for given project ID and unit ID
   * @param request
   * @returns
   */
  async createRequest(request: FastifyRequest<CreateCatamaranRequest>) {
    const { params, body } = request;
    try {
      const catamaranConfig = await this.catamaranConfigService.fetchCatamaranConfigurationDetail();
      /**Checking if booking is made under the limit of prior booking time */
      if (
        new Date(body.book_in_date) > DateUtils.addHoursToDate(new Date(), catamaranConfig.catamaran_prior_booking_time)
      ) {
        logger.error(
          `CatamaranService -> createRequest : Booking time is greater than prior booking time limit : ${PRIOR_BOOKING_TIME}, project_id : ${params.project_id}, unit_id : ${params.unit_id}`,
        );

        throw new BadRequestError(CATAMARAN_ERROR.PRIOR_BOOKING_LIMIT.CODE);
      }

      if (catamaranConfig.is_request_generation_flow) await this.checkForAvailability(request);
      const noOfPaxEntry = catamaranConfig.no_of_pax.find(
        (entry) => Number(entry.value) === Number(body.number_of_pax),
      );
      if (!noOfPaxEntry) {
        logger.error(
          `CatamaranService -> createRequest : Invalid no_of_pax choosen, project_id : ${params.project_id} unit_id : ${params.unit_id}, no_of_pax : ${body.number_of_pax}`,
        );

        throw new BadRequestError(CATAMARAN_ERROR.INVALID_NO_OF_PAX.CODE);
      }
      return await this.catamaranDAO.createRequest({
        ...body,
        cost: noOfPaxEntry.cost,
        user_id: request.decodedToken?.vianaar_uid,
        project_id: params.project_id,
        unit_id: params.unit_id,
        add_time: new Date(),
      });
    } catch (error) {
      logger.error(
        `CatamaranService -> createRequest : Failed to create catamaran request for project_id : ${params.project_id}, unit_id : ${params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to check catamaran availabilty for given time slot
   * @param request
   * @returns
   */
  private async checkForAvailability(request: FastifyRequest<CreateCatamaranRequest>) {
    const { params, body } = request;
    logger.info(
      `CatamaranService -> checkForAvailability :: Checking if the slot is available project_id: ${params.project_id},unit_id :${params.unit_id}, slot_id: ${body.slot_id}, book_in_date: ${body.book_in_date}`,
    );

    const existingRequest = await this.catamaranDAO.findBySlotId(request);
    if (existingRequest) {
      logger.error(
        `CatamaranService -> selfBookingRequest : Time slot not available.project_id : ${params.project_id}, unit_id : ${params.unit_id}, book_in_date : ${body.book_in_date}, slot_id : ${body.slot_id}`,
      );

      throw new BadRequestError(CATAMARAN_ERROR.NOT_AVAILABLE.CODE);
    }
  }
}
