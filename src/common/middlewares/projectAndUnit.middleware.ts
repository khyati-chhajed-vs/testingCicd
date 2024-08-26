/**
 * File: projectAndUnit.middleware
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 23-05-2024
 * Description: Middleware to check project or unit of user
 */
import { FastifyRequest } from 'fastify';

import { UserProjectDAO } from '../../dao';
import { PROJECT_AND_UNIT_ERR } from '../constants/middleware.constant';
import { BadRequestError } from '../exceptions/errors';
import { logger } from '../services/logger.service';
import { PROJECT_STATUS } from '../constants';

export default class ProjectAndUnitMiddleWare {
  /**
   * Prehandler to check if project and unit exist for
   * given project ID and unit ID
   * @param request
   */
  static async getProjectAndUnit(request: FastifyRequest) {
    const { project_id, unit_id }: any = request?.params ?? {};

    logger.info(
      `ProjectAndUnitMiddleWare -> projectAndUnitCheck :: Fetching project and unit detail for project_id : ${project_id} and unit_id : ${unit_id}`,
    );

    const userProjectDao = new UserProjectDAO();

    const unitAndProject = await userProjectDao.findUnitAndProject(
      unit_id,
      project_id,
      request.decodedToken?.vianaar_uid,
    );

    if (!unitAndProject.length || unitAndProject == null) {
      logger.error(
        `ProjectAndUnitMiddleWare -> projectAndUnitCheck :: Given project and unit id not found. project_id : ${project_id}, unit_id : ${unit_id} `,
      );

      throw new BadRequestError(PROJECT_AND_UNIT_ERR.NOT_FOUND.CODE);
    }

    logger.info(
      `ProjectAndUnitMiddleWare -> projectAndUnitCheck :: Fetched details for project and unit for project_id : ${project_id} and unit_id : ${unit_id}`,
    );

    request.data = { unitAndProject };
  }

  /**
   * Prehandler to check if project and unit exist for
   * given project ID and unit ID and is in ongoing state
   * @param request
   */
  static async validateOngoingProjectAndUnit(request: FastifyRequest) {
    const { project_id, unit_id }: any = request?.params ?? {};

    logger.info(
      `ProjectAndUnitMiddleWare -> validateOngoingProjectAndUnit :: Fetching project and unit detail for project_id : ${project_id} and unit_id : ${unit_id}`,
    );

    const userProjectDao = new UserProjectDAO();

    const [unitAndProject] = await userProjectDao.findUnitAndProjectByStatus(
      unit_id,
      project_id,
      request.decodedToken?.vianaar_uid,
      PROJECT_STATUS.ONGOING,
    );

    if (!unitAndProject || unitAndProject == null) {
      logger.error(
        `ProjectAndUnitMiddleWare -> projectAndUnitCheck :: Given project and unit id not found or status invalid. project_id : ${project_id}, unit_id : ${unit_id} `,
      );

      throw new BadRequestError(PROJECT_AND_UNIT_ERR.NOT_FOUND_OR_STATUS_INVALID.CODE);
    }

    logger.info(
      `ProjectAndUnitMiddleWare -> projectAndUnitCheck :: Fetched details for project and unit for project_id : ${project_id} and unit_id : ${unit_id}`,
    );

    request.data = { unitAndProject };
  }

  /**
   * Prehandler to check if project and unit exist for
   * given project ID and unit ID and is in completed state
   * @param request
   */
  static async validateCompletedProjectAndUnit(request: FastifyRequest) {
    const { project_id, unit_id }: any = request?.params ?? {};

    logger.info(
      `ProjectAndUnitMiddleWare -> projectAndUnitCheck :: Fetching project and unit detail for project_id : ${project_id} and unit_id : ${unit_id}`,
    );

    const userProjectDao = new UserProjectDAO();

    const [unitAndProject] = await userProjectDao.findUnitAndProjectByStatus(
      unit_id,
      project_id,
      request.decodedToken?.vianaar_uid,
      PROJECT_STATUS.COMPLETED,
    );

    if (!unitAndProject || unitAndProject == null) {
      logger.error(
        `ProjectAndUnitMiddleWare -> projectAndUnitCheck :: Given project and unit id not found. project_id : ${project_id}, unit_id : ${unit_id} `,
      );

      throw new BadRequestError(PROJECT_AND_UNIT_ERR.NOT_FOUND_OR_STATUS_INVALID.CODE);
    }

    logger.info(
      `ProjectAndUnitMiddleWare -> projectAndUnitCheck :: Fetched details for project and unit for project_id : ${project_id} and unit_id : ${unit_id}`,
    );

    request.data = { unitAndProject };
  }
}
