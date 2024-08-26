/**
 * File: cleaning.dao
 * Author: manoj.fulara@vectoscalar.com
 * Date: 31-05-2024
 * Description: DAO to handle db related request for tbl_appt_reg_data
 */

import { Service } from 'fastify-decorators';
import { ModelDefined } from 'sequelize';

import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { CleaningDetailsRequest, GetMISSummaryRequest } from '../types/v1';
import { DateUtils } from '../common/utils';
import { FastifyRequest } from 'fastify';
import { logger } from '../common/services/logger.service';

@Service()
export class CleaningDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.CleaningModel!;
  }

  /**
   * Method to fetch cleaning data for a given project ID and unit ID
   * @param project_id
   * @param unit_id
   * @param start_date
   * @param end_date
   * @param cleaning_type_id
   * @returns
   */
  async getCleaningDetails(request: FastifyRequest<CleaningDetailsRequest>) {
    const { project_id, unit_id } = request.params,
      { year, month, cleaning_type_id } = request.query,
      { start_date, end_date } = DateUtils.getMonthDateRange(year, month);

    const query = `
      SELECT 
      entry_date date,
      JSON_ARRAYAGG(
          JSON_OBJECT(
               'id' ,id,
              'cleaning_type', COALESCE (cleaning_type,'cleaning'),
              'heading',COALESCE (heading,''),
              'sub_heading',COALESCE (sub_heading_name,''),
              'time', entry_time ,
              'images_urls', IF(images IS NULL, JSON_ARRAY(), images)
          )
      ) AS data
      FROM (
        SELECT 
          subquery.id,entry_date, cleaning_type, entry_time , heading,sub_heading_name,
      CASE
          WHEN image_url is not null THEN JSON_ARRAYAGG(image_url)
          ELSE JSON_ARRAY()
      END AS images
          FROM (
              SELECT 
                  regdata.id,entry_date, cleaning_type.name  AS cleaning_type, entry_time,image_url,heading,sub_heading_name
              FROM tbl_appt_reg_data regdata 
              LEFT JOIN tbl_cleaning_type cleaning_type ON cleaning_type.id = regdata.cleaning_type_id 
              left join tbl_appt_reg_headings headings on headings.id =regdata.heading_id
              left join tbl_appt_reg_sub_headings subheading on subheading.id =regdata.sub_heading_id
              LEFT JOIN tbl_cleaning_images cleaning_images on cleaning_images.apt_reg_data_id = regdata.id
               WHERE  project_id = ? AND unit_id = ? and flag = 1 and entry_date between ? AND ?   
          ${typeof cleaning_type_id === 'number' ? ` AND regdata.cleaning_type_id = ${cleaning_type_id}` : ''} 
          ) AS subquery
      GROUP BY entry_date, cleaning_type ) AS grouped_data GROUP BY entry_date order by date desc;
      
     
     
      `;

    return this.executeQueryWithParam({
      query,
      bindParams: [project_id, unit_id, start_date, end_date],
    });
  }

  /**
   * Method to fetch cleaning images
   * for given project ID and unit ID
   * @param unit_id
   * @param project_id
   * @returns
   */
  async getImages(unit_id: number, project_id: number, limit: number, offset: number) {
    const query = `
        SELECT
          DATE(cleaning.add_time) AS add_time,
          image_url,
          COALESCE(sub_heading.sub_heading_name,name) AS title
        FROM
          tbl_cleaning_images cleaning_images
        JOIN
            tbl_appt_reg_data cleaning 
            ON
          cleaning.id = cleaning_images.apt_reg_data_id
        LEFT JOIN 
            tbl_appt_reg_sub_headings sub_heading
            ON
          cleaning.sub_heading_id = sub_heading.id
        LEFT JOIN 
          tbl_cleaning_type cleaning_type 
          ON
          cleaning.cleaning_type_id = cleaning_type.id  
        WHERE 
          project_id = ? 
        AND
          unit_id = ?
        ORDER BY add_time DESC
        limit ? offset ?
    `;
    return await this.executeQueryWithParam({ query, bindParams: [project_id, unit_id, limit, limit * offset] });
  }

  /**
   * Method to fetch last month MIS summary data for a project_id and unit_id
   * @param request
   * @param last_start_date
   * @param last_month_end_date
   * @returns
   */
  async getMISSummary(
    request: FastifyRequest<GetMISSummaryRequest>,
    last_start_date: String,
    last_month_end_date: string,
  ) {
    const { project_id, unit_id } = request.params;

    const query = `
      SELECT count(*) AS total_days,COALESCE(name,'cleaning') AS cleaning_type,sub_heading_name ,heading,  DATE_FORMAT(entry_date, '%M')  AS last_month, 
        YEAR(entry_date) AS last_year
      FROM tbl_appt_reg_data regdata LEFT JOIN tbl_cleaning_type cleaning_type ON regdata.cleaning_type_id=cleaning_type.id 
      LEFT JOIN tbl_appt_reg_headings tarh ON tarh.id= regdata.heading_id
      LEFT JOIN tbl_appt_reg_sub_headings tarsh ON tarsh.id= regdata.sub_heading_id
      WHERE project_id =? AND unit_id=? AND entry_date BETWEEN '${last_start_date}' and '${last_month_end_date}'
       GROUP BY cleaning_type_id,regdata.heading_id,regdata.sub_heading_id   
     `;

    return await this.executeQueryWithParam({
      query,
      bindParams: [project_id, unit_id],
    });
  }

  /**
   * Method to fetch cleaning types
   * @returns
   */
  async getCleaningType() {
    logger.debug(`cleaningDAO -> getCleaningTypes :: fetch cleaning type`);

    const query = `SELECT id, name from tbl_cleaning_type where status = 'ACTIVE' `;
    return this.executeQueryWithParam({ query });
  }
}
