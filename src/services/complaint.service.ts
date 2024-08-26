/**
 * File: complaint.service
 * Author: Akshika.Choudhary
 * Date: 14-06-2024
 * Description: Serivce class to fetch complaints raised by customer
 */

import { Service, Inject } from 'fastify-decorators';
import moment from 'moment';
import { BaseService } from '../common/services/base.service';
import { ComplaintDAO } from '../dao';
import { ComplaintEscalationRequest, ComplaintRequest, GetComplaintRequest } from '../types/v1';
import { FastifyRequest } from 'fastify';
import {
  COMPLAINT_ERR,
  APPLICATION_NAME,
  REQUEST_STATUS,
  ESCALATION_DAYS,
  ESCALATION_MONTHS,
} from '../common/constants';
import { BadRequestError, NotFoundError } from '../common/exceptions/errors';
import { logger } from '../common/services/logger.service';

@Service()
export class ComplaintService extends BaseService {
  @Inject(ComplaintDAO)
  private complaintDAO!: ComplaintDAO;

  /**
   * Method to fetch complaint raised by customer with project_id and unit_id.
   * @request {GetComplaintRequest}
   * @returns object[]
   */

  async fetchRaisedComplaints(request: FastifyRequest<GetComplaintRequest>) {
    logger.debug(
      `ComplaintService-> fetchRaisedComplaints : fetch details of all raised complaints with project_id : ${request.params.project_id} and unit_id ${request.params.unit_id}`,
    );
    try {
      const complaints = await this.complaintDAO.fetchAllRaisedComplaints(request);
      if (!complaints?.length) {
        logger.warn(
          `ComplaintService -> fetchRaisedComplaints : no complaints found for project_id ${request.params.project_id} and unit_id ${request.params.unit_id}`,
        );
        return [];
      }
      return complaints;
    } catch (error) {
      logger.error(
        `ComplaintService -> fetchRaisedComplaints : Failed to get complaints raised by customer for project_id :${request.params.project_id} and ${request.params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to fetch complaint types and their associated issues.
   * @request
   * @returns object[]
   */

  async fetchComplaintsTypes() {
    try {
      const complaintsTypesWithIssues = await this.complaintDAO.fetchComplaintTypes();

      if (!complaintsTypesWithIssues.length) {
        logger.error(`ComplaintService -> fetchComplaintsAndAssociatedIssues :  no complaints Types and issues found`);

        throw new NotFoundError(COMPLAINT_ERR.COMPLAINT_NOT_FOUND.CODE);
      }
      return complaintsTypesWithIssues;
    } catch (error) {
      logger.error(
        `ComplaintService -> fetchComplaintsAndAssociatedIssues : Failed to fetch complaints and their associsted issues `,
      );
    }
  }

  /**
   * Method to raise complaint for given
   * project ID and unit ID
   * @param request
   * @returns
   */
  async create(request: FastifyRequest<ComplaintRequest>) {
    const { body, params } = request;

    try {
      return await this.complaintDAO.raiseComplaint({
        ...body,
        project_id: params.project_id,
        unit_id: params.unit_id,
        user_id: request.decodedToken?.vianaar_uid,
        add_time: new Date(),
        add_by: APPLICATION_NAME,
      });
    } catch (error) {
      logger.error(
        `ComplaintService -> raise :: Failed to raise complaint. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to escalate complaints ticket for given project_id and unit_id
   * @param request
   */
  async escalate(request: FastifyRequest<ComplaintEscalationRequest>) {
    try {
      const { complaint_id, project_id, unit_id } = request.params;
      const { comments } = request.body;

      // Fetch complaint data
      const complaintData: any = await this.complaintDAO.fetchComplaint(complaint_id);

      if (!complaintData) {
        logger.error(`ComplaintService -> escalate :: unable to fetch complaint data for complaint: ${complaint_id}`);
        throw new NotFoundError(COMPLAINT_ERR.COMPLAINT_NOT_FOUND.CODE);
      }

      const { update_time, request_status, escalate_counter } = complaintData;
      const updateTime = moment(update_time);
      const currentTime = moment();

      const daysSinceUpdate = currentTime.diff(updateTime, 'days');
      const monthsSinceUpdate = currentTime.diff(updateTime, 'months');

      if (
        (request_status === REQUEST_STATUS.PROCESSING && daysSinceUpdate <= ESCALATION_DAYS) ||
        (request_status === REQUEST_STATUS.COMPLETED &&
          (monthsSinceUpdate >= ESCALATION_MONTHS ||
            (monthsSinceUpdate === ESCALATION_MONTHS && currentTime.date() > updateTime.date()))) ||
        escalate_counter >= 2
      ) {
        logger.error(
          `ComplaintService -> escalate :: not allowed to escalate on complaint for complaint id: ${complaint_id}`,
        );
        throw new BadRequestError(COMPLAINT_ERR.NOT_ALLOWED.CODE);
      }

      const [affectedRows] = await this.complaintDAO.escalate(complaint_id, {
        escalation_description: comments,
        escalate_counter: escalate_counter + 1,
        is_escalated: true,
      });

      if (!affectedRows) {
        logger.error(
          `ComplaintService -> escalate :: Failed to escalate complaint_id: ${complaint_id}, project_id: ${project_id}, unit_id: ${unit_id}`,
        );
        throw new BadRequestError(COMPLAINT_ERR.BAD_REQUEST.CODE);
      }
    } catch (error: any) {
      logger.error(
        `ComplaintService -> escalate :: Error escalating complaint_id: ${request.params.complaint_id}, project_id: ${request.params.project_id}, unit_id: ${request.params.unit_id}, error: ${error.message}`,
      );
      throw error;
    }
  }
}
