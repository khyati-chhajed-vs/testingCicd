/**
 * File: notification.controller
 * Author: AKSHIKA CHOUDHARY
 * Date: 07-18-2024
 * Description: Controller for notification
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject, PATCH } from 'fastify-decorators';
import { logger } from '../../common/services/logger.service';

import { BASE_ENDPOINT, NOTIFICATION_SETTINGS_ENDPOINT, STATUS_CODES, USER_ENDPOINT } from '../../common/constants';
import { NOTIFICATION_ENDPOINT } from '../../common/constants';
import { GetNotificatonResponseSchema, UpdateNotificatonRequestSchema } from '../../schema/v1';
import { GetNotificationRequest, UpdateNotificationsRequest, UpdateNotificationsSettingsRequest } from '../../types/v1';
import { AuthController } from '../../common/controllers/auth.controller';
import { NotificationService } from '../../services';
import { UpdateNotificatonSettingsSchema } from '../../schema/v1/notification/updateSettings';

@Controller({
  route: BASE_ENDPOINT + USER_ENDPOINT + NOTIFICATION_ENDPOINT,
})
export default class NotificationController extends AuthController {
  @Inject(NotificationService)
  private notificationService!: NotificationService;

  /**
   * API to get notifications for given project ID and unit ID
   * @param request
   * @param reply
   */

  @GET('', {
    schema: GetNotificatonResponseSchema,
  })
  async get(request: FastifyRequest<GetNotificationRequest>, reply: FastifyReply) {
    logger.info(
      `NotificationController -> get :: Request to get notifications for project_id : ${request.query.project_id}, unit_id : ${request.query.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.notificationService.get(request));
  }

  /**
   * API to mark notifications as read
   * @param request
   * @param reply
   */
  @PATCH('', {
    schema: UpdateNotificatonRequestSchema,
  })
  async markAsRead(request: FastifyRequest<UpdateNotificationsRequest>, reply: FastifyReply) {
    logger.info(
      `NotificationController -> update :: Request to mark all notifications for project_id : ${request.query.project_id}, unit_id : ${request.query.unit_id} as read`,
    );
    const updatedResponse = await this.notificationService.markAllAsRead(request);
    logger.info(
      `NotificationController -> update :: Successsfully marked all notifications for project_id : ${request.query.project_id}, unit_id : ${request.query.unit_id} as read, updated rows : ${updatedResponse}`,
    );
    reply.status(STATUS_CODES.NO_CONTENT);
  }

  /**
   * API to update notification settings
   * @param request
   * @param reply
   */

  @PATCH(NOTIFICATION_SETTINGS_ENDPOINT, {
    schema: UpdateNotificatonSettingsSchema,
  })
  async updateNotificationSettings(request: FastifyRequest<UpdateNotificationsSettingsRequest>, reply: FastifyReply) {
    logger.info(
      `NotificationController -> updateNotificationSettings :: Request to update notifications settings for project_id : ${request.query.project_id}, unit_id : ${request.query.unit_id} user_id : ${request.decodedToken?.vianaar_uid}`,
    );
    await this.notificationService.updateNotificationSettings(request);

    logger.info(
      `NotificationController -> updateNotificationSettings ::  notifications settings updated sucessfully for project_id : ${request.query.project_id}, unit_id : ${request.query.unit_id}`,
    );
    reply.status(STATUS_CODES.NO_CONTENT);
  }
}
