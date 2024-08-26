/**
 * File: user.service
 * Author: moinuddin.ansari@vianaar.co.in & sonu.singh@vianaar.co.in
 * Date: 01-08-2024
 * Description: Service for handling user related bussiness logic
 */

import { Service, Inject } from 'fastify-decorators';
import { logger } from '../common/services/logger.service';

// import { USER_ERROR } from '../common/constants';
// import { NotFoundError } from '../common/exceptions/errors';
import { BaseService } from '../common/services/base.service';
import { VcareUserDAO } from '../dao';

@Service()
export class VcareUserService extends BaseService {
  @Inject(VcareUserDAO)
  private vcareuserDAO!: VcareUserDAO;

  /**
   * Method to fetch user details for given user ID
   * @param caretaker_id
   * @returns
   */
  async getUserTypes(caretaker_id: number) {
    try {
      const userTypes: any = await this.vcareuserDAO.findByUser(caretaker_id);

      if (!userTypes) {
        logger.warn(`LoginService -> getUserTypes : Login user type not found for caretaker_id : ${caretaker_id}`);
        return [];
      }
      return userTypes;
    } catch (error) {
      logger.error(`LoginService -> getUserTypes :: Failed to fetch user types for caretaker_id :  ${caretaker_id}`);

      throw error;
    }
  }
}
