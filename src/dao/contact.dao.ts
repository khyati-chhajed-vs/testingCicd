/**
 * File: emergencyContact.dao
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 30-05-2024
 * Description: Class to handle database requet of Emergency Contact APIs
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class ContactDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.EmergencyContactModel!;
  }

  /**
   * Method to fetch emergency contact for given project id
   * @param project_id
   * @returns
   */
  async fetch(project_id: number) {
    const emergencyContacts = await this.model.findAll({ where: { project_id } });
    logger.info(
      `EmergencyContactDAO -> fetchEmergencyConatct :: fetched emergency contact
       for project_id : ${project_id}`,
    );
    return emergencyContacts;
  }
}
