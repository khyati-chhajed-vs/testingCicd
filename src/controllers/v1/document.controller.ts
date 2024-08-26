/**
 * File: document.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 23-05-2024
 * Description: Controller for document APIs
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject, POST } from 'fastify-decorators';
import { logger } from '../../common/services/logger.service';

import {
  BASE_ENDPOINT,
  CATEGORY_ENDPOINT,
  CATEGORY_ID_ENDPOINT,
  DOCUMENT_ENDPOINT,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  STATUS_CODES,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
} from '../../common/constants';
import { AuthController } from '../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { GetDocumentSchema, uploadDocument } from '../../schema/v1';
import { DocumentService } from '../../services';
import { GetDocumentRequest, UploadDocumentRequest } from '../../types/v1';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + DOCUMENT_ENDPOINT,
})
export default class DocumentController extends AuthController {
  @Inject(DocumentService)
  private documentService!: DocumentService;

  /*
   * API to upload user's document for given project ID and unit ID
   * @param request
   * @param reply
   */
  @POST('', {
    schema: uploadDocument,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async upload(request: FastifyRequest<UploadDocumentRequest>, reply: FastifyReply) {
    logger.info(
      `DocumentController -> uploadDocument :: Request to add document for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    const documentId = await this.documentService.upload(request);

    logger.info(
      `DocumentController -> uploadDocument :: Data uploaded successfully. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.CREATED).send(documentId);
  }

  /**
   * API to fetch user's document for given
   * category ID, project ID and unit ID
   * @param request
   * @param reply
   */
  @GET(CATEGORY_ENDPOINT + CATEGORY_ID_ENDPOINT, {
    schema: GetDocumentSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async get(request: FastifyRequest<GetDocumentRequest>, reply: FastifyReply) {
    logger.info(
      `DocumentController -> get : Request to get user's documents for project_id :${request.params.project_id} unit_id :${request.params.unit_id} and category_id :${request.params.category_id}`,
    );

    const documents = await this.documentService.get(request);

    logger.info(
      `DocumentController -> get : Successfully fetched documents for category_id ${request.params.category_id} , project_id : ${request.params.project_id} and unit_id ${request.params.unit_id} `,
    );

    reply.status(STATUS_CODES.SUCCESS).send(documents);
  }
}
