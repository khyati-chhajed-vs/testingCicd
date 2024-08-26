// /**
//  * File: health.controller
//  * Author: MANOJ.FULARA@VECTOSCALAR.COM
//  * Date: 14-06-2024
//  * Description:Controller Class for Health Controller
//  */

// import { Controller, GET, Inject } from 'fastify-decorators';
// import { FastifyReply, FastifyRequest } from 'fastify';
// import { HEALTH_ENDPOINT, STATUS_CODES } from '../../../common/constants';
// import { HealthService } from '../../../services/healthCheck.service';
// import { BaseController } from '../../../common/controllers/base.controller';
// import { logger } from '../../../common/services/logger.service';

// @Controller({ route: HEALTH_ENDPOINT })
// export default class HealthController extends BaseController {
//   @Inject(HealthService)
//   private healthService!: HealthService;

//   /**
//    * API to determine service health
//    * @param request
//    * @param reply
//    */
//   @GET('')
//   async checkHealth(request: FastifyRequest, reply: FastifyReply) {
//     logger.info(`HealthController -> checkHealth :: Request to check health of server`);

//     const { overall_status, ...health_check_response } = await this.healthService.checkHealth();
//     reply.status(overall_status ? STATUS_CODES.SUCCESS : STATUS_CODES.SERVER_ERROR).send(health_check_response);
//   }
// }
