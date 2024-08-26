/**
 * File: gallery.controller
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 22-07-2024
 * Description: Controller for gallery API
 */

import { Controller, GET, Inject } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  BASE_ENDPOINT,
  STATUS_CODES,
  GALLERY_ENDPOINT,
} from '../../common/constants';
import { GalleryService } from '../../services';
import { GetGalleryResponseSchema } from '../../schema/v1';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { AuthController } from '../../common/controllers/auth.controller';
import { logger } from '../../common/services/logger.service';
import { GetGalleryRequest } from '../../types/v1';

@Controller({
  route: BASE_ENDPOINT + PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + GALLERY_ENDPOINT,
})
export default class GalleryController extends AuthController {
  @Inject(GalleryService)
  private galleryService!: GalleryService;

  /**
   * API to fetch gallery image for given project ID and unit ID
   * @param request
   * @param reply
   */
  @GET('', {
    schema: GetGalleryResponseSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async getImages(request: FastifyRequest<GetGalleryRequest>, reply: FastifyReply) {
    logger.info(
      `GalleryController -> getImages :: Request to fetch images for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id} and category : ${request.query.category}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.galleryService.getImages(request));
  }
}
