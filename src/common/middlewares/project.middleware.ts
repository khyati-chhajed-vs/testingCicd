/**
 * File: project.middleware
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 23-05-2024
 * Description: Middleware to check project of user
 */
import { FastifyRequest } from 'fastify';

import { UserProjectDAO } from '../../dao';
import { PROJECT_AND_UNIT_ERR } from '../constants/middleware.constant';
import { BadRequestError } from '../exceptions/errors';
import { logger } from '../services/logger.service';
import { PROJECT_STATUS } from '../constants/project.constant';

export default class ProjectMiddleWare {
  /**
   * Prehandler to check if project with given project ID exist
   * and is in completed state
   * @param request
   */
  static async validateCompletedProject(request: FastifyRequest) {
    const { project_id }: any = request?.params ?? {};

    logger.info(
      `ProjectMiddleWare -> validateCompletedProject :: Fetching project detail for project_id : ${project_id}`,
    );

    const userProjectDao = new UserProjectDAO();

    const project = await userProjectDao.findProject({
      project_id,
      user_id: request.decodedToken?.vianaar_uid,
      project_status: PROJECT_STATUS.COMPLETED,
    });

    if (!project.length) {
      logger.error(
        `ProjectMiddleWare -> validateCompletedProject :: Given project id not found or this request is not allowed in present state. project_id : ${project_id}`,
      );

      throw new BadRequestError(PROJECT_AND_UNIT_ERR.PROJECT_STATUS_INVALID.CODE);
    }

    request.data = { project };
  }

  /**
   * Prehandler to check if project with given project ID exist
   * and is in ongoing state
   * @param request
   */
  static async validateOngoingProject(request: FastifyRequest) {
    const { project_id }: any = request?.params ?? {};

    logger.info(
      `ProjectMiddleWare -> validateOngoingProject :: Fetching project detail for project_id : ${project_id}`,
    );

    const userProjectDao = new UserProjectDAO();

    const project = await userProjectDao.findProject({
      project_id,
      user_id: request.decodedToken?.vianaar_uid,
      project_status: PROJECT_STATUS.ONGOING,
    });

    if (!project.length) {
      logger.error(
        `ProjectMiddleWare -> validateOngoingProject :: Given project id not found or this request is not allowed in present state. project_id : ${project_id}`,
      );

      throw new BadRequestError(PROJECT_AND_UNIT_ERR.PROJECT_STATUS_INVALID.CODE);
    }

    request.data = { project };
  }
}
