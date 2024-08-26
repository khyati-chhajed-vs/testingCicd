/**
 * File: unit.service
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 07-06-2024
 * Description: This service class is responsible for handling business logic operations
 *              related to units.
 */

import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';

import { UnitDAO } from '../dao';
import { NotFoundError } from '../common/exceptions/errors';
import { UNIT_ERR } from '../common/constants/';
import { logger } from '../common/services/logger.service';

@Service()
export class UnitService extends BaseService {
  @Inject(UnitDAO)
  private unitDao!: UnitDAO;

  /**
   * Method to fetch project unit details for a given unit ID
   * @param request
   */
  async getUnitDetais(unit_id: number) {
    try {
      const unitDetails: any = await this.unitDao.getUnitDetais(unit_id);
      logger.debug(`UnitService -> getUnitDetais : fetched unit details for unit_id : ${unit_id} is ${unitDetails}`);

      if (!unitDetails) {
        logger.error(`UnitService -> getUnitDetais : unit details not found for unit_id : ${unit_id} `);
        throw new NotFoundError(UNIT_ERR.UNIT_NOT_FOUND.CODE);
      }
      return unitDetails;
    } catch (error) {
      logger.error(
        `UnitService -> getUnitDetais : Failed to get unit details for unit_id :${unit_id}, error: ${error}`,
      );

      throw error;
    }
  }
}
