/**
 * File: complaint.dao
 * Author:  Akshika.Choudhary
 * Date: 14-06-2024
 * Description: DAO class to do database operations of raised complaints
 */

import { Service } from 'fastify-decorators';

import { BaseDAO } from '../common/base.dao';
import { FastifyRequest } from 'fastify';
import { GetComplaintRequest } from '../types/v1';
import { SequelizeClient } from '../clients';
import { ModelDefined } from 'sequelize';
import { logger } from '../common/services/logger.service';

@Service()
export class ComplaintDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.ComplaintModel!;
  }

  /**
   * Method to get all raised complaints for
   * project ID and unit ID
   * @param request
   * @returns object[]
   */
  async fetchAllRaisedComplaints(request: FastifyRequest<GetComplaintRequest>) {
    const query = `
    SELECT
      request.id,
      complaint_title,
      request.complaint_type_id,
      complaint_type.name as complaint_type,
      issue_id,
      issue.name as issue_name,
      comments,
      request_status,
      admin_comments,
      file_url,
      request.add_time,
      escalation_description,
      is_escalated,
      request.update_time,
      request.escalate_counter
    FROM
      tbl_complaint_requests request
    LEFT JOIN
    tbl_complaint_issue issue 
    ON
      issue.id = request.issue_id
    LEFT JOIN
    tbl_complaint_type complaint_type 
    ON
      complaint_type.id = request.complaint_type_id
    WHERE
      project_id = ?
      AND unit_id = ?
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `;
    return this.executeQueryWithParam({
      query,
      bindParams: [
        request.params.project_id,
        request.params.unit_id,
        request.query.limit,
        request.query.limit * request.query.offset,
      ],
    });
  }

  /**
   * Method fetch active complaint types and their associated active issues from the `tbl_complaint_type` and `tbl_complaint_issue` tables.
   * @param request
   * @returns object[]
   */

  async fetchComplaintTypes() {
    const query = `SELECT 
    tbl_complaint_type.id AS complaint_type_id,
    tbl_complaint_type.name AS complaint_name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', tbl_complaint_issue.id,
            'name', tbl_complaint_issue.name
        )
    ) AS issues
    FROM 
        tbl_complaint_type 
    INNER JOIN 
        tbl_complaint_issue 
    ON 
    tbl_complaint_type.id = tbl_complaint_issue.complaint_type_id
    WHERE
        tbl_complaint_type.status = 'ACTIVE' AND
        tbl_complaint_issue.status = 'ACTIVE'
    GROUP BY
        tbl_complaint_type.id, tbl_complaint_type.name;`;

    return this.executeQueryWithParam({ query });
  }

  /**
   * Method to raise a complaint for given
   * project ID and unit ID
   * @param data
   * @returns
   */
  async raiseComplaint(data: any) {
    const complaint = await this.create(this.model, data);
    logger.debug(
      `ComplaintDAO -> raiseComplaint :: Complaint created. project_id : ${data.project_id}, unit_id : ${data.unit_id}, Details : ${JSON.stringify(complaint)}`,
    );

    return complaint.id;
  }

  /**
   * Method to escalate complaints ticket for given project_id and unit_id
   * @param id
   * @param data
   * @returns
   */
  async escalate(id: number, data: any) {
    return await this.model.update(data, { where: { id } });
  }

  /**
   * Method to get complaint ticket for given complaint_id
   * @param id
   * @returns
   */
  async fetchComplaint(id: number) {
    return await this.findById(this.model, id);
  }
}
