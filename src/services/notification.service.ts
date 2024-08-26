/**
 * File: notification.service
 * Author: AKSHIKA CHOUDHARY
 * Date: 18-07-2024
 * Description: Service to handle logic of notifications API's
 */

import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { BaseService } from '../common/services/base.service';
import { GetNotificationRequest, UpdateNotificationsRequest, UpdateNotificationsSettingsRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';
import { NotificationDAO } from '../dao/notification.dao';
import { UserService } from './user.service';
import { ProjectService } from './project.service';
import { UserDAO } from '../dao/';

@Service()
export class NotificationService extends BaseService {
  @Inject(NotificationDAO)
  private notificationDAO!: NotificationDAO;

  @Inject(UserService)
  private userService!: UserService;

  @Inject(ProjectService)
  private projectService!: ProjectService;

  @Inject(UserDAO)
  private userDAO!: UserDAO;

  /**
   * Method to get notifications for given project ID and unit ID or User id
   * @param request
   * @returns
   */

  async get(request: FastifyRequest<GetNotificationRequest>) {
    const { project_id, unit_id, limit, offset } = request.query;
    const userId = request.decodedToken?.vianaar_uid;

    try {
      if (project_id && unit_id) {
        await this.projectService.getUnitAndProject(unit_id, project_id, userId);
      } else {
        await this.userService.getUserDetails(userId);
      }

      const notifications =
        project_id && unit_id
          ? await this.notificationDAO.findNotifications(request)
          : await this.notificationDAO.findNotificationsByUserId(limit, offset, userId);

      const [notificationData] = notifications;

      if (!notificationData.notifications || !notificationData.notifications.length) {
        const identifier =
          project_id && unit_id ? `project_id: ${project_id} and unit_id: ${unit_id}` : `user_id: ${userId}`;
        logger.warn(`NotificationService -> get : no notification found for ${identifier}`);
        return notificationData;
      }

      return notificationData;
    } catch (error) {
      logger.error(
        `NotificationService -> get :: Failed to fetch notifications for project_id: ${project_id}, unit_id: ${unit_id}, error: ${error}`,
      );

      throw error;
    }
  }

  /**
   * Method to mark notifications as read
   * @param request
   * @returns
   */
  async markAllAsRead(request: FastifyRequest<UpdateNotificationsRequest>) {
    try {
      return await this.notificationDAO.markAllAsRead(
        request.query.project_id,
        request.query.unit_id,
        request.decodedToken?.vianaar_uid,
      );
    } catch (error) {
      logger.error(
        `NotificationService -> update :: Failed to mark notifications as read for project_id : ${request.query.project_id}, unit_id : ${request.query.unit_id}, error : ${error}`,
      );
      throw error;
    }
  }

  /**
   * Method to update user and user project notifications settings
   * @param request
   * @returns
   */

  async updateNotificationSettings(request: FastifyRequest<UpdateNotificationsSettingsRequest>) {
    const transaction = await this.userDAO.getTransaction();
    try {
      const { property_update_notification, ...userSettigs } = request.body;
      await this.userService.updateUserDetails(
        request.decodedToken?.vianaar_uid,
        { notification_settings: userSettigs },
        transaction,
      );

      if (request.body.hasOwnProperty('property_update_notification')) {
        await this.projectService.getUnitAndProject(
          request.query.unit_id,
          request.query.project_id,
          request.decodedToken?.vianaar_uid,
        );

        await this.projectService.updateUserProject(
          request.query.project_id,
          request.query.unit_id,
          { property_update_notification },
          transaction,
        );
      }
      await transaction.commit();
      logger.info(
        `NotificationService -> updateNotificationSettings :: notifications settings updated successfully  for project_id : ${request.query.project_id}, unit_id : ${request.query.unit_id}, user_id : ${request.decodedToken?.vianaar_uid}`,
      );
    } catch (error) {
      await transaction.rollback();
      logger.error(
        `NotificationService -> updateNotificationSettings :: Failed to update notifications settings  for project_id : ${request.query.project_id}, unit_id : ${request.query.unit_id}, user_id : ${request.decodedToken?.vianaar_uid} error : ${error}`,
      );
      throw error;
    }
  }
}
