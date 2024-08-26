/**
 * File: notification.dao
 * Author: AKSHIKA CHOUDHARY
 * Date: 18-07-2024
 * Description: DAO class for database operations
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, QueryTypes } from 'sequelize';

import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

import { logger } from '../common/services/logger.service';
import { READ_STATUS } from '../common/constants';

@Service()
export class NotificationDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.NotificationModel!;
  }
  /**
   * Method to find notification for project_id and unit_id
   * @param project_id
   * @param unit_id
   * @param limit
   * @param offset
   * @returns
   */

  async findNotifications(request) {
    const { project_id, unit_id, limit, offset } = request.query;
    logger.debug(
      `NotificationDAO -> findNotifications :: finding notifications for project_id : ${project_id} unit_id : ${unit_id}`,
    );
    const query = `SELECT
    (SELECT COUNT(*)
    FROM tbl_notifications n
    JOIN tbl_notifications_users nu ON n.id = nu.notification_id
    WHERE (n.project_id = ${project_id} AND n.unit_id = ${unit_id} AND  n.status = 'ACTIVE' AND nu.read_status = ${READ_STATUS}) OR (nu.user_id = ${request.decodedToken?.vianaar_uid} AND  n.status = 'ACTIVE' AND nu.read_status = ${READ_STATUS})) AS unread_count,
  
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', n.id,
      'notification_heading', n.notification_heading,
      'notification_comments', n.notification_comments,
      'image_name', n.image_name,
      'status', n.status,
      'add_time', DATE_FORMAT(n.add_time, '%Y-%m-%dT%T.000Z'),
      'read_status', nu.read_status
    )
  ) AS notifications
FROM
  (
    SELECT n.*
    FROM tbl_notifications n
    JOIN tbl_notifications_users nu ON n.id = nu.notification_id
    WHERE (n.project_id = ${project_id} AND n.unit_id = ${unit_id} AND  n.status = 'ACTIVE') OR (nu.user_id = ${request.decodedToken?.vianaar_uid}
    AND  n.status = 'ACTIVE')
    ORDER BY n.add_time DESC
    LIMIT ${limit} OFFSET ${limit * offset}
  ) AS n
LEFT JOIN tbl_notifications_users nu ON n.id = nu.notification_id;
`;
    return await this.executeQueryWithParam({ query });
  }

  /**
   * Method to find notification for user_id
   * @param user_id
   * @returns
   */

  async findNotificationsByUserId(limit: number, offset: number, user_id: number) {
    logger.debug(`NotificationDAO -> findNotificationsByUserId :: finding notifications for user_id ${user_id}`);

    const query = `SELECT
  (SELECT COUNT(*)
   FROM tbl_notifications n
   JOIN tbl_notifications_users nu ON n.id = nu.notification_id
   WHERE nu.user_id = ${user_id} AND n.status = 'ACTIVE'
     AND nu.read_status = ${READ_STATUS}
     AND nu.notification_type = 'USER'
    ) AS unread_count,
  
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', n.id,
      'notification_heading', n.notification_heading,
      'notification_comments', n.notification_comments,
      'image_name', n.image_name,
      'status', n.status,
      'add_time', DATE_FORMAT(n.add_time, '%Y-%m-%dT%T.000Z'),
      'read_status', nu.read_status
    )
  ) AS notifications
  FROM
  (
    SELECT n.*
    FROM tbl_notifications n
    JOIN tbl_notifications_users nu ON n.id = nu.notification_id
    WHERE nu.user_id = ${user_id} AND  n.status = 'ACTIVE' AND nu.notification_type = 'USER'
    ORDER BY n.add_time DESC
    LIMIT ${limit} OFFSET ${limit * offset}
  ) 
    AS n
LEFT JOIN tbl_notifications_users nu ON n.id = nu.notification_id ;
`;
    return await this.executeQueryWithParam({ query });
  }

  /**
   * Method to mark all notification as read
   * @param project_id
   * @param unit_id
   * @returns
   */
  async markAllAsRead(project_id: any, unit_id: any, user_id: number) {
    const query = `
    UPDATE
      tbl_notifications_users nu 
    SET
	    nu.read_status  = 1
    WHERE
	    user_id = ${user_id} and nu.read_status = 0 ${project_id && unit_id ? `and notification_type = 'PROJECT'` : `and notification_type = 'USER'`}
    `;
    return await this.executeQueryWithParam({ query }, QueryTypes.UPDATE);
  }
}
