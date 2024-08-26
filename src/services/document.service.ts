/**
 * File: document.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 23-05-2024
 * Description: Service to handle document APIs logic
 */
import { FastifyRequest } from 'fastify';
import { Service, Inject } from 'fastify-decorators';

import { APPLICATION_NAME, STATUS } from '../common/constants/common.constant';
import { BadRequestError, NotFoundError } from '../common/exceptions/errors';
import { BaseService } from '../common/services/base.service';
import { DocumentDAO } from '../dao';
import { UploadDocumentRequest } from '../types/v1/Document/add';
import { DOCUMENT_ERR } from '../common/constants';
import { GetDocumentRequest } from '../types/v1';
import { logger } from '../common/services/logger.service';

@Service()
export class DocumentService extends BaseService {
  @Inject(DocumentDAO)
  private documentDAO!: DocumentDAO;

  /**
   * Method to upload document for given project ID and unit ID
   * @param request
   * @returns
   */
  async upload(request: FastifyRequest<UploadDocumentRequest>) {
    const { body, params } = request;

    try {
      await this.checkDuplicate(request);

      return await this.documentDAO.upload({
        ...body,
        file: body.document_url,
        project_id: params.project_id,
        unit_id: params.unit_id,
        app_user_id: request.decodedToken?.vianaar_uid,
        add_time: new Date(),
        add_by: APPLICATION_NAME,
        status: STATUS.ACTIVE,
      });
    } catch (error) {
      logger.error(
        `DocumentService -> upload :: Failed to uplaod document. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
      );

      throw error;
    }
  }

  /**
   * Method to check duplicate title of document
   * for given project ID and unit ID
   * @param request
   */
  private async checkDuplicate(request: FastifyRequest<UploadDocumentRequest>) {
    const { body, params } = request;

    logger.info(
      `DocumentService -> checkDuplicate :: Checking if the title of file is unique or not. project_id : ${params.project_id}, unit_id : ${params.unit_id} title: ${body.title}`,
    );

    const duplicateDocument = await this.documentDAO.findByTitle(body.title, params);

    if (duplicateDocument) {
      logger.error(
        `DocumentService -> uploadDocument : Title already exists. project_id : ${params.project_id}, unit_id : ${params.unit_id} title : ${body.title}`,
      );

      throw new BadRequestError(DOCUMENT_ERR.ALREADY_EXISTS.CODE);
    }

    logger.info(
      `DocumentService -> uploadDocument : No duplicate document exist. project_id : ${params.project_id}, unit_id : ${params.unit_id} title : ${body.title}`,
    );
  }

  /**
   * Method to fetch the documents by
   * category ID, project ID and unit ID
   * @param request
   * @returns
   */
  async get(request: FastifyRequest<GetDocumentRequest>) {
    const { project_id, unit_id, category_id } = request.params;
    const { limit, offset } = request.query;

    try {
      const [documents] = await this.documentDAO.findDocumentsByCategoryId({
        project_id,
        unit_id,
        category_id,
        limit,
        offset,
      });

      if (!documents?.data?.length) {
        logger.warn(
          `DocumentService -> get : No documents found for category_id ${category_id}, project_id ${project_id} and unit_id ${unit_id}`,
        );
        return [];
      }

      return documents;
    } catch (error) {
      logger.error(
        `DocumentService -> get : Failed to get documents for project_id :${request.params.project_id} unit_id :${request.params.unit_id} and category_id :${request.params.category_id}, error: ${error}`,
      );

      throw error;
    }
  }

  /**
   * Method to fetch document categories.
   * @returns
   */

  async fetchDocumentCategories() {
    logger.debug(`DocumentService -> fetchDocumentCategories: fetch document categories`);
    try {
      const documentCategories = await this.documentDAO.fetch();
      if (!documentCategories?.length) {
        logger.error(`DocumentService -> fetchDocumentCategories : Document Categories not found`);
        throw new NotFoundError(DOCUMENT_ERR.NOT_FOUND.CODE);
      }
      return documentCategories;
    } catch (error) {
      logger.error(
        `DocumentService -> fetchDocumentCategories : Failed to fecth document categories and error: ${error}`,
      );

      throw error;
    }
  }
}
