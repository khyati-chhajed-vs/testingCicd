/**
 * File: user.service
 * Author: manoj.fulara@vectoscalar.com
 * Date: 24-05-2024
 * Description: Service for handling user related bussiness logic
 */

import { Service, Inject } from 'fastify-decorators';

import { USER_ERROR } from '../common/constants';
import { NotFoundError } from '../common/exceptions/errors';
import { BaseService } from '../common/services/base.service';
import { UserDAO } from '../dao/';
import { logger } from '../common/services/logger.service';
import { emailClient } from '../clients/email.client';
import Mustache from 'mustache';
import { templates } from '../common/utils/emailTempltes';
import { firebaseClient } from '../common/services/firebaseAuth.service';
import { Transaction } from 'sequelize';

@Service()
export class UserService extends BaseService {
  @Inject(UserDAO)
  private userDAO!: UserDAO;

  /**
   * Method to fetch user details for given user ID
   * @param user_id
   * @returns
   */
  async getUserDetails(user_id: number) {
    try {
      const userDetail: any = await this.userDAO.findByUserId(user_id);

      if (!userDetail) {
        logger.error(`UserService -> getUserDetails :: user not found for user_id : ${user_id}`);

        throw new NotFoundError(USER_ERROR.NOT_FOUND.CODE, USER_ERROR.NOT_FOUND.MESSAGE);
      }

      return {
        user_id,
        user_name: userDetail.user_name,
        dob: userDetail.dob,
        user_email: userDetail.user_email,
        user_mobile: userDetail.user_mobile,
        user_address: userDetail.user_address,
        add_time: userDetail.add_time,
        add_by: userDetail.add_by,
        notification_settings: userDetail.notification_settings,
      };
    } catch (error) {
      logger.error(`UserService -> getUserDetails :: Failed to fetch user details for user_id :  ${user_id}`);

      throw error;
    }
  }

  /**
   * Method to create user on firebase.
   * @param request
   * @returns
   */

  async createUser(request) {
    await Promise.all(
      request?.map(async (user) => {
        const { user_email, user_mobile, user_name, user_id } = user;
        try {
          // Create user in Firebase Auth
          const user_data = await firebaseClient.createUser(user_email, user_mobile, user_name);

          await this.userDAO.updateUser(user_id, {
            firebase_user_id: user_data.uid,
            error_description: null,
            create_status: 'success',
          });

          await firebaseClient.setCustomClaims(user_data.uid, {
            vianaar_uid: user_id,
            user_name,
            user_email,
            user_mobile,
          });

          const resetLink = await firebaseClient.resetPassword(user.user_email);

          const emailTemplate = await Mustache.render(templates['password_set_up'].body, {
            name: user_name.charAt(0).toUpperCase() + user_name.slice(1).toLowerCase(),
            link: resetLink,
          });

          await emailClient.sendEmail(user_email, emailTemplate, templates['password_set_up'].subject);
        } catch (error: any) {
          logger.error(`UserService -> createUser :: error while creating user : ${user.user_email}`);

          await this.userDAO.updateUser(user_id, {
            create_status: 'error',
            error_description: error.message,
          });
        }
      }),
    );
  }

  /**
   * Method to update user details for given user ID
   * @param user_id
   * @returns
   */

  async updateUserDetails(user_id: number, request, transaction?: Transaction | null) {
    try {
      return await this.userDAO.updateUser(user_id, request, transaction);
    } catch (error) {
      logger.error(
        `UserService -> updateUserDetails :: Failed to update user details for user_id :  ${user_id} error ${error}`,
      );
      throw error;
    }
  }

  /**
   * Method to get user details for given params.
   * @param params
   * @returns
   */

  async getUserDetailsByParams(params: any) {
    try {
      const userDetail = await this.userDAO.findByUserParams(params);
      if (!userDetail) {
        logger.error(`UserService -> getUserDetails :: user not found for param : ${params}`);

        throw new NotFoundError(USER_ERROR.NOT_FOUND.CODE, USER_ERROR.NOT_FOUND.MESSAGE);
      }

      return userDetail;
    } catch (error) {
      logger.error(`UserService -> getUserDetails :: Failed to fetch user details for user_id :  ${params}`);

      throw error;
    }
  }
}
