/**
 * File: userProjectDAO
 * Author: Akshika Choudhary
 * Date: 3-05-2024
 * Description: DAO service for user projects
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, QueryTypes, Transaction } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { ProjectType } from '../types/v1';
@Service()
export class UserProjectDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.UserProjectModel!;
  }

  /**
   * Method to fetch all projects and their details for a user.
   * @returns
   */
  async fetchUserProjectsDetails(userId: number) {
    logger.debug(
      `UserProjectDAO -> fetchUserProjects :: To fetch all projects associated to a user based on user_id:  ${userId}  `,
    );
    const query = `SELECT 
     userProjects.id,
     userProjects.project_id,
     projects.project_name,
     userProjects.project_unit_id AS unit_id,
     units.unit_name,
     projects.project_status,
     units.is_rental_enabled,
     projects.project_address,
     projects.image_name AS project_image,
     projects.project_type,
     projects.add_time,
     projects.survey_status,
     userProjects.property_update_notification,
     userProjects.furnish_property_status,
     units.smoobu_id,
     userProjects.survey_postpone_count,
     userProjects.device_id,
     userProjects.rental_request_status
 FROM 
     tbl_user_projects userProjects
 JOIN 
     tbl_project projects ON userProjects.project_id = projects.project_id
 JOIN 
     tbl_units units ON userProjects.project_unit_id = units.unit_id
 WHERE 
 userProjects.user_id =${userId};
 `;
    return SequelizeClient.sequelize.query(query, { type: QueryTypes.SELECT });
  }

  /**
   * Method to fetch unit and project details of
   * given user ID, project ID and unit ID
   * @param unit_id
   * @param project_id
   */
  async findUnitAndProject(unit_id: number, project_id: number, user_id: number) {
    const query = `SELECT 
  project.project_id,
  project.area_id,
  project.project_name,
  project.project_address,
  project.image_name,
  project.position,
  project.project_type,
  project.project_status,
  project.google_ff_url,
  project.google_ff_vhospitality_url,
  project.enable_electric_car_module,
  project.status,
  project.add_ip,
  project.add_time,
  project.add_by,
  project.update_ip,
  project.update_by,
  project.update_time,
  project.survey_status,
  user_project.user_id,
  user_project.project_id,
  user_project.project_unit_id,
  user_project.project_unit,
  user_project.is_welcome_video_watched,
  user_project.survey_postpone_count,
  user_project.furnish_property_status,
  user_project.rental_request_status,
  unit.is_rental_enabled
FROM 
  tbl_user_projects user_project
JOIN 
  tbl_project project ON project.project_id = user_project.project_id
JOIN 
  tbl_units unit ON unit.unit_id = user_project.project_unit_id
WHERE 
  user_project.user_id = ?
  AND user_project.project_unit_id = ?
  AND project.project_id = ?; `;
    const project = await this.executeQueryWithParam({ query, bindParams: [user_id, unit_id, project_id] });

    logger.debug(
      `UserProjectDAO -> findUnitAndProject :: Found project with project_id : ${project_id} and unit_id : ${unit_id}, user_id :${user_id}. Project details : ${JSON.stringify(project)}`,
    );

    return project;
  }

  /**
   * Method to fetch unit and project details of
   * given status, user ID, project ID and unit ID
   * @param unit_id
   * @param project_id
   */
  async findUnitAndProjectByStatus(unit_id: number, project_id: number, user_id: number, status: string) {
    const query = `
    SELECT
      user_id,
      user_project.project_id ,
      project_unit_id,
      project_status,
      project_name,
      user_project.furnish_property_status
    FROM
      tbl_user_projects user_project
    JOIN
      tbl_project project on
      project.project_id = user_project.project_id
    WHERE
      user_project.project_id = ${project_id}
      AND project_unit_id = ${unit_id}
      AND user_id = ${user_id}
      AND project_status = '${status}'
    `;

    return SequelizeClient.sequelize.query(query, { type: QueryTypes.SELECT });
  }

  /**
   * Method to fetch project details of
   * given user ID, project ID and project status
   * @param unit_id
   * @param project_id
   * @returns
   */
  async findProject(body: ProjectType) {
    const bindParams = [body.project_id, body.user_id, body.project_status];

    const query = ` 
      SELECT *
      FROM tbl_project tp
      LEFT JOIN tbl_user_projects tup
          ON tp.project_id = tup.project_id
      WHERE tp.project_id = ?
          AND user_id = ?
          AND project_status = ?
      LIMIT 1;
    `;

    const project = this.executeQueryWithParam({ query, bindParams });

    logger.info(`UnitsDAO -> findUnitAndProject :: Found project with project_id : ${body.project_id}`);

    return project;
  }

  /**
   * Method to update record by given project_id and unit_id
   * @param project_id
   * @param unit_id
   * @param data
   * @param transaction
   */
  async updateRecord(project_id: number, unit_id: number, data, transaction?: Transaction | null) {
    logger.debug(`UserProjectDAO -> updateRecord :: updating record with data ${JSON.stringify(data)}`);
    return this.model.update({ ...data }, { where: { project_id, project_unit_id: unit_id }, transaction });
  }
}
