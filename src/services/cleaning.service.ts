/**
 * File: cleaning.service
 * Author: akshika.choudhary@vectoscalar.com
 * Date: 21-05-2024
 * Description: Service Class for logic of cleaning apis
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';
import { CleaningDAO } from '../dao/';
import { CleaningDetailsRequest, GetMISSummaryRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';
import { DateUtils } from '../common/utils';

@Service()
export class CleaningService extends BaseService {
  @Inject(CleaningDAO)
  private cleaningDAO!: CleaningDAO;

  /**
   * Method to fetch cleaning data for given project ID and unit ID
   * @param request
   * @returns
   */
  async getCleaningDetails(request: FastifyRequest<CleaningDetailsRequest>): Promise<any[]> {
    const { project_id, unit_id } = request.params;
    try {
      logger.debug(
        `CleaningService -> getCleaningDetails :: Service routine invoked for project_id: ${project_id}, unit_id: ${unit_id}`,
      );

      const cleaningDetails: any[] = await this.cleaningDAO.getCleaningDetails(request);

      logger.debug(`CleaningService -> getCleaningDetails :: cleaningDetails: ${JSON.stringify(cleaningDetails)}`);

      return cleaningDetails ?? [];
    } catch (error) {
      logger.error(
        `CleaningService -> getCleaningDetails: Failed to get cleaning details for project_id: ${project_id} and unit_id: ${unit_id}, error: ${error}`,
      );

      throw error;
    }
  }

  /**
   * Method to fetch cleaning images
   * for given project ID and unit ID
   * @param unit_id
   * @param project_id
   * @returns
   */
  async getCleaningImages(unit_id: number, project_id: number, limit: number, offset: number) {
    logger.info(
      `CleaningService -> getCleaningImages :: Fetching images of category cleaning for project id : ${project_id}, unit id : ${unit_id}`,
    );
    return await this.cleaningDAO.getImages(unit_id, project_id, limit, offset);
  }

  /*
   * Method to fetch last month MIS summary data for a project_id and unit_id
   * @param request
   * @returns
   */
  async getMISSummary(request: FastifyRequest<GetMISSummaryRequest>) {
    const { project_id, unit_id } = request.params;
    const { year, month_name, month_index } = DateUtils.getLastMonthNameAndYear();
    const { start_date, end_date } = DateUtils.getMonthDateRange(Number(year), month_index);

    try {
      logger.debug(
        `CleaningService -> getMISSummary :: Service routine invoked for project_id: ${project_id}, unit_id: ${unit_id}`,
      );

      const mis_summary: any[] = await this.cleaningDAO.getMISSummary(request, start_date, end_date);

      logger.debug(`CleaningService -> getMISSummary :: MIS Summary: ${JSON.stringify(mis_summary)}`);

      return { month: month_name, year, data: mis_summary ?? [] };
    } catch (error) {
      logger.error(
        `CleaningService -> getMISSummary: Failed to get MIS summary for project_id: ${project_id} and unit_id: ${unit_id}, error: ${error}`,
      );
    }
  }

  /**
   * Method to fetch cleaning type
   * @returns
   */
  async getCleaningTypes() {
    try {
      logger.debug(`CleaningService -> getCleaningTypes :: feth cleaning types `);

      const cleaningDetails = await this.cleaningDAO.getCleaningType();

      logger.debug(`CleaningService -> getCleaningTypes :: cleaning Types: ${JSON.stringify(cleaningDetails)}`);

      return cleaningDetails ?? [];
    } catch (error) {
      logger.error(`CleaningService -> getCleaningTypes: Failed to get cleaning type, error: ${error}`);

      throw error;
    }
  }
}
