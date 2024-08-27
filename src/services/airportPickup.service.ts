/**
 * File: airportPickup.service
 * Author: akshika.choudhary@vectoscalar.com
 * Date: 24-05-2024
 * Description: This service class is responsible for handling business logic operations
 *              related to airport pickup.
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import {
  APPLICATION_NAME,
  HOURS_CONSTANTS,
  AIRPORT_PICKUP_ERRORS,
  USER,
  STATUS,
  REQUEST_STATUS,
} from '../common/constants';
import { BadRequestError } from '../common/exceptions/errors';
import { BaseService } from '../common/services/base.service';
import { DateUtils } from '../common/utils';
import { AirportPickupDAO } from '../dao/';
import { GetAirportRequest, CancelAirportRequest, CreateAirportPickupRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';
import { ConfigurationService } from './configuration.service';

@Service()
export class AirportPickupService extends BaseService {
  @Inject(AirportPickupDAO)
  private airportPickupDAO!: AirportPickupDAO;

  @Inject(ConfigurationService)
  private configurationService!: ConfigurationService;

  /**
   * Method to create airport pickup request for given project ID and unit ID
   * @param request
   * @returns
   */
  async createRequest(request: FastifyRequest<CreateAirportPickupRequest>) {
    const { project_id, unit_id } = request.params;
    const { body } = request;

    try {
      await this.validateRequest(request);

      return await this.airportPickupDAO.createRequest({
        ...body,
        project_id: project_id,
        unit_id: unit_id,
        add_time: new Date(),
        add_by: APPLICATION_NAME,
        user_id: request.decodedToken?.vianaar_uid,
        tat_twenty_four: DateUtils.addHoursToDate(new Date(), HOURS_CONSTANTS.TWENTY_FOUR),
        tat_forty_eight: DateUtils.addHoursToDate(new Date(), HOURS_CONSTANTS.FORTY_EIGHT),
      });
    } catch (error) {
      logger.error(
        `AirportPickupService -> createRequest :: Request failed to create airport pickup request. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to check whether the airport pickup request for given project ID and unit ID already exist
   * @param request
   */
  private async validateRequest(request: FastifyRequest<CreateAirportPickupRequest>) {
    const { project_id, unit_id } = request.params;
    const { body } = request;

    logger.info(
      `AirportPickupService -> validateRequest :: checking if airport pickup request already exist for project id : ${project_id} and unit_id : ${unit_id}`,
    );

    const [airportPickupRequest, [airportsList]]: any = await Promise.all([
      this.airportPickupDAO.findByAirportIdAndStatus(request),
      this.configurationService.fetchAirportDetails(),
    ]);

    if (airportPickupRequest) {
      logger.error(
        `AirportPickupService -> validateRequest ::  duplicate airport pickup request for project_id : ${project_id}, unit_id : ${unit_id} and airport_id :${body.airport_id} and request_date :${body.request_date} , request_time :${body.request_time} `,
      );
      throw new BadRequestError(AIRPORT_PICKUP_ERRORS.DUPLICATE_REQUEST.CODE);
    }
    const airportIds = airportsList.json_value.map((airport) => Number(airport?.id));
    if (!airportIds.includes(Number(body.airport_id))) {
      logger.error(`AirportPickupService -> validateRequest ::  airport_id :${body.airport_id} not exist `);
      throw new BadRequestError(AIRPORT_PICKUP_ERRORS.BAD_REQUEST.CODE);
    }
  }

  /**
   * Method to delete airport pickup request for given
   * project ID, unit ID and request ID
   * @param {request}
   */
  async cancel(request: FastifyRequest<CancelAirportRequest>) {
    const { params } = request;

    try {
      const [airportPickupRequest] = await this.airportPickupDAO.cancel(
        params.request_id,
        params.project_id,
        params.unit_id,
        request.decodedToken?.app_user_id,
        {
          update_time: new Date(),
          deleted_by: USER,
          request_status: REQUEST_STATUS.DELETED_BY_USER,
          status: STATUS.DELETE,
        },
      );
      if (!airportPickupRequest) {
        logger.error(
          `AirportPickupService -> cancel :: cannot process this cancellation request as the requested data is either already deleted or request is invalid`,
        );
        throw new BadRequestError(AIRPORT_PICKUP_ERRORS.BAD_REQUEST.CODE);
      }
    } catch (error) {
      logger.error(
        `AirportPickupService -> cancel :: Request failed to cancel airport pickup request. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to fetch all the airport pickup request for given project ID and unit ID
   * @param {GetAirportRequest}
   */
  async getAirportRequests(request: FastifyRequest<GetAirportRequest>) {
    try {
      const [airportDetails, airportRequests]: any[] = await Promise.all([
        this.configurationService.fetchAirportDetails(),
        this.airportPickupDAO.getAllRequests(request),
      ]);

      if (!airportRequests) {
        return [];
      }

      const airports = airportDetails[0].json_value.reduce((acc, detail) => {
        acc[detail.id] = detail.airport_name;
        return acc;
      }, {});

      const pickuprequests = await airportRequests.map((pickup) => {
        pickup['airport_name'] = airports[pickup.airport_id];
        return pickup;
      });

      logger.debug(
        `AirportPickupService -> getAirportRequests : airport pickup requests for project_id ${request.params.project_id} and unit_id ${request.params.unit_id} is ${airportRequests}`,
      );

      return pickuprequests;
    } catch (error) {
      logger.error(
        `AirportPickupService -> getAirportRequests : Failed to fetch airport requests for project_id :${request.params.project_id} unit_id :${request.params.unit_id}, error: ${error}`,
      );

      throw error;
    }
  }
}
