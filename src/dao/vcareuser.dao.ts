/**
 * File: user.dao
 * Author: moinuddin.ansari@vianaar.co.in & sonu.singh@vianaar.co.in
 * Date: 01-08-2024
 * Description: DAO for db operations related to tbl_users
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';

@Service()
export class VcareUserDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.VcareUserModel!;
  }

  /**
   * Method fetch user details for given user ID
   * @param caretaker_id
   * @returns
   */
  async findByUser(caretaker_id: number) {
    logger.debug(`VcareUserDAO -> findByUser :: fetching user types for caretaker_id : ${caretaker_id}`);
    this.findById(this.model, caretaker_id);

    const query = `
    SELECT
      caretaker_id,user_type,email,mobile,password
    FROM
      tbl_caretaker
    WHERE
      caretaker_id = ?
    `;
    //console.log("Hello Moin Query",query);

    //`SELECT *,AES_DECRYPT(password, 'VIANAAR') AS pass_value FROM tbl_caretaker WHERE email = ${db.escape(req.body.email)} || mobile = ${db.escape(req.body.mobile)}   ;`

    return this.executeQueryWithParam({ query, bindParams: [caretaker_id] });
  }
}
