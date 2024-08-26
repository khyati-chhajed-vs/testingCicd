/**
 * File: exploreGoa.dao
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 29-05-2024
 * Description: Class to handle database request of explore goa APIs
 */

import { Service } from 'fastify-decorators';
import { BaseDAO } from '../common/base.dao';
import { FastifyRequest } from 'fastify';
import { RecommendationsRequest } from '../types/v1';
import { SequelizeClient } from '../clients';
import { QueryTypes } from 'sequelize';

@Service()
export class RecommendationDAO extends BaseDAO {
  /**
   * Method to fetch recommendation for given category ID
   * @returns
   */
  async getByCategoryIdAndAreaId(request: FastifyRequest<RecommendationsRequest>) {
    let query = `
    SELECT
        recommendation_id,
        recommendations.area_id ,
        area.area_name ,
        recommendations.category_id,
        category_name ,
        recommendation_name,
        home_delivery,
        show_monsoon,
        recommendation_phone,
        tie_up,
        address,
        description,
        image_name,
        url_key,
        recommendations.add_by ,
        recommendations.add_time,
        location_url
    FROM
        tbl_recommendations recommendations
    LEFT JOIN tbl_recommendation_area area 
    ON
        area.area_id = recommendations.area_id
    JOIN 
        tbl_recommendation_category category on
        recommendations.category_id = category.category_id
    WHERE
        recommendations.category_id = ${request.params.category_id}
  `;

    query += request.query.area_id
      ? ` AND
        recommendations.area_id = ${request.query.area_id} `
      : ``;

    query += `LIMIT ${request.query.limit} OFFSET ${request.query.offset * request.query.limit}`;

    return await SequelizeClient.sequelize.query(query, { type: QueryTypes.SELECT });
  }

  /**
   * Method to fetch active recommendation categories
   * @returns
   */
  async fetchCategory() {
    const query = `
    SELECT
	recommendation.category_id,
	category.category_name ,
	JSON_ARRAYAGG(
            JSON_OBJECT(
                'area_id', area.area_id,
                'area_name', area.area_name
            )
        ) AS areas
    FROM
        (
        SELECT
            *
        FROM
            tbl_recommendations recommendation
        GROUP BY
            recommendation.area_id ,
            recommendation.category_id) AS recommendation
    LEFT JOIN
        tbl_recommendation_area area ON
        area.area_id = recommendation.area_id
    JOIN
        tbl_recommendation_category category ON
        category.category_id = recommendation.category_id
    GROUP BY
        recommendation.category_id ,
        category.category_name
    `;

    return this.executeQueryWithParam({
      query,
      bindParams: [],
    });
  }
}
