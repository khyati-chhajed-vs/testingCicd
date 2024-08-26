/**
 * File: document.dao
 * Author: manoj.fulara@vectoscalar.com
 * Date: 23-05-2024
 * Description: DAO class to do database operations on documents
 */

import { Service } from 'fastify-decorators';
import { ModelDefined, QueryTypes } from 'sequelize';
import { logger } from '../common/services/logger.service';
import { SequelizeClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { DocumentRequestParam } from '../types/v1';

@Service()
export class DocumentDAO extends BaseDAO {
  model: ModelDefined<any, any>;

  constructor() {
    super();
    this.model = SequelizeClient.models.DocumentModel!;
  }

  /**
   * Method to upload document details for given project ID and unit ID
   * @param data
   * @returns
   */
  async upload(data) {
    const document = await this.create(this.model, data);
    logger.debug(
      `DocumentDAO -> uploadDocument :: Data uploaded to databse. project_id : ${data.project_id}, unit_id : ${data.unit_id}, document details : ${JSON.stringify(document)}`,
    );

    return document.id;
  }

  /**
   * Method to find document by given title, project ID and unit ID
   * @param title
   * @param params
   */
  async findByTitle(title: string, params: DocumentRequestParam) {
    const document = await this.findOne(this.model, {
      ...params,
      title,
    });
    return document;
  }

  /**
   * Method to fetch document for given project ID , unit ID and category ID
   * @param param0
   * @returns
   */
  async findDocumentsByCategoryId({ project_id, unit_id, category_id, limit, offset }) {
    const bindParams: number[] = [project_id, unit_id, category_id, limit, offset * limit];

    const query = `
      SELECT 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', id, 
          'title', title, 
          'document_url', file,
          'add_by' ,add_by ,
          'add_time', add_time
        ) 
      ) AS data
      FROM 
        (SELECT * FROM tbl_documents 
      WHERE 
        project_id = ? AND unit_id = ? AND category_id = ?  and status ='ACTIVE'
        ORDER BY tbl_documents.id DESC
        limit ?  
        offset ? ) AS documents;
      `;

    return this.executeQueryWithParam({ query, bindParams });
  }

  /**
   * Method to fetch all document categories.
   * @returns
   */
  async fetch() {
    logger.debug(`DocumentDAO -> fetch :: To fetch all categories of documents`);
    const documentCategories = `SELECT 
      documentCategory.id as id,
      documentCategory.name as category_name
     
   FROM 
   tbl_document_categories documentCategory
   WHERE 
     documentCategory.status = "ACTIVE"
   `;

    return SequelizeClient.sequelize.query(documentCategories, { type: QueryTypes.SELECT });
  }
}
