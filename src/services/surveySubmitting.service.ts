/**
 * File: surveySubmitting.service
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description:This service class is responsible for handling business logic operations
 *              related to survey user data
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';

import { SurveySubmittingDAO } from '../dao/';
import { SubmitSurveyRequest } from '../types/v1';
import { Transaction } from 'sequelize';

import { UnitService } from './unit.service';

@Service()
export class SurveySubmittingService extends BaseService {
  @Inject(SurveySubmittingDAO)
  private SurveySubmittingDAO!: SurveySubmittingDAO;

  @Inject(UnitService)
  private unitService!: UnitService;

  /**
   * Method to submit survey user data for a project_id and unit_id
   * @param request
   * @returns
   */
  async create(request: FastifyRequest<SubmitSurveyRequest>, transaction: Transaction) {
    const { project_id, unit_id } = request.params;

    const unitDetails = await this.unitService.getUnitDetais(unit_id);

    return await this.SurveySubmittingDAO.createRequest(
      {
        user_email: request?.decodedToken?.email,
        user_mobile: request.decodedToken?.phone_number,
        unit_name: unitDetails.unit_name,
        project_name: request.data.unitAndProject?.[0]?.project_name,
        user_full_name: request.decodedToken?.user_name,
        project_id: project_id,
        unit_id: unit_id,
        submitting_date: new Date(),
        add_time: new Date(),
        add_by: request.decodedToken?.user_name,
        user_id: request.decodedToken?.vianaar_uid,
      },
      transaction,
    );
  }
}
