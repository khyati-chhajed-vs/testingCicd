/**
 * File: configuration.controller
 * Author: AKSHIKA.CHOUDHARY
 * Date: 07-05-2024
 */

import { Controller, GET, Inject } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BASE_ENDPOINT, STATUS_CODES } from '../../common/constants/common.constant';
import { CONFIGURATION_ENDPOINT, CATAMARAN_CONFIG_ENDPOINT } from '../../common/constants/configuration.constant';
import { GetAppConfigSchema, GetCatamaranConfigSchema } from '../../schema/v1';
import { ConfigurationService } from '../../services';
import { CatamaranConfigService } from '../../services/catamaranConfig.service';
import { BaseController } from '../../common/controllers/base.controller';
import { logger } from '../../common/services/logger.service';

@Controller({
  route: BASE_ENDPOINT + CONFIGURATION_ENDPOINT,
})
export default class ConfigurationController extends BaseController {
  @Inject(ConfigurationService)
  private configurationService!: ConfigurationService;

  @Inject(CatamaranConfigService)
  private catamaranConfigService!: CatamaranConfigService;

  /**
   * API to fetch app configs details
   * @param request
   * @param reply
   */
  @GET('', { schema: GetAppConfigSchema })
  async fetchAppConfigs(request: FastifyRequest, reply: FastifyReply) {
    logger.info(`ConfigurationController -> fetchAppConfigs :: Request to fetch app configs`);

    reply.status(STATUS_CODES.SUCCESS).send(await this.configurationService.fetchConfigurationDetail());
  }

  /**
   * This API will fetch all the catamaran configurations
   * @param request
   * @param reply
   */
  @GET(CATAMARAN_CONFIG_ENDPOINT, { schema: GetCatamaranConfigSchema })
  async fetchCatamaranConfig(request: FastifyRequest, reply: FastifyReply) {
    logger.info(`ConfigurationController -> fetchCatamaranConfigs :: Request to fetch catamaran configs`);

    reply.status(STATUS_CODES.SUCCESS).send(await this.catamaranConfigService.fetchCatamaranConfigurationDetail());
  }
}
