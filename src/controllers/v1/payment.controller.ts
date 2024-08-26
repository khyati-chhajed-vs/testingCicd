/**
 * File: payment.controller
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 22-07-2024
 * Description: Controller for payment related APIs
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject, POST } from 'fastify-decorators';
import { logger } from '../../common/services/logger.service';

import {
  BASE_ENDPOINT,
  STATUS_CODES,
  PROJECT_ENDPOINT,
  PROJECT_ID_ENDPOINT,
  UNIT_ENDPOINT,
  UNIT_ID_ENDPOINT,
  DEMAND_ENDPOINT,
  DEMAND_ID_ENDPOINT,
  TRANSACTION_ENDPOINT,
  GENERATE_HASH_ENDPOINT,
} from '../../common/constants';
import { createTransaction, generateHash, GetPendingPaymentSchema, GetTransactionSchema } from '../../schema/v1';
import { DemandService } from '../../services';
import {
  createTransactionRequest,
  GenerateHashRequest,
  GetPendingPaymentRequest,
  GetTransactionRequest,
} from '../../types/v1';
import { AuthController } from '../../common/controllers/auth.controller';
import ProjectAndUnitMiddleWare from '../../common/middlewares/projectAndUnit.middleware';
import { TransactionService } from '../../services/transaction.service';

@Controller({
  route: BASE_ENDPOINT,
})
export default class PaymentController extends AuthController {
  @Inject(DemandService)
  private demandService!: DemandService;

  @Inject(TransactionService)
  private transactionService!: TransactionService;

  /**
   * API to fetch pending payment demands for given project ID and unit ID
   * @param request
   * @param reply
   */

  @GET(PROJECT_ENDPOINT + PROJECT_ID_ENDPOINT + UNIT_ENDPOINT + UNIT_ID_ENDPOINT + DEMAND_ENDPOINT, {
    schema: GetPendingPaymentSchema,
    preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
  })
  async get(request: FastifyRequest<GetPendingPaymentRequest>, reply: FastifyReply) {
    logger.info(
      `PaymentController -> get :: Request to get pending payment demands  for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.demandService.get(request));
  }

  /**
   * API to create payment transaction
   * @param request
   * @param reply
   */
  @POST(
    PROJECT_ENDPOINT +
      PROJECT_ID_ENDPOINT +
      UNIT_ENDPOINT +
      UNIT_ID_ENDPOINT +
      DEMAND_ENDPOINT +
      DEMAND_ID_ENDPOINT +
      TRANSACTION_ENDPOINT,
    {
      schema: createTransaction,
      preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
    },
  )
  async createTransaction(request: FastifyRequest<createTransactionRequest>, reply: FastifyReply) {
    logger.info(
      `PaymentController -> createTransaction :: Request to create payment transaction  for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}  ,user_id :${request.decodedToken?.user_id}`,
    );

    reply.status(STATUS_CODES.CREATED).send(await this.transactionService.createTransaction(request));
  }

  /**
   * API to generate hash code for a payment transaction
   * @param request
   * @param reply
   */
  @POST(GENERATE_HASH_ENDPOINT, {
    schema: generateHash,
  })
  async generateHash(request: FastifyRequest<GenerateHashRequest>, reply: FastifyReply) {
    logger.info(`PaymentController -> generateHash :: Request to generate hash for payment transaction`);

    reply
      .status(STATUS_CODES.SUCCESS)
      .send(await this.transactionService.generateHash(request.body.hash_string_without_salt));
  }

  /**
   * API to fetch demand transaction for given project ID and unit ID
   * @param request
   * @param reply
   */
  @GET(
    PROJECT_ENDPOINT +
      PROJECT_ID_ENDPOINT +
      UNIT_ENDPOINT +
      UNIT_ID_ENDPOINT +
      DEMAND_ENDPOINT +
      DEMAND_ID_ENDPOINT +
      TRANSACTION_ENDPOINT,
    {
      schema: GetTransactionSchema,
      preHandler: [ProjectAndUnitMiddleWare.getProjectAndUnit],
    },
  )
  async getTransaction(request: FastifyRequest<GetTransactionRequest>, reply: FastifyReply) {
    logger.info(
      `PaymentController -> get :: Request to get pending payment demands  for project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id}`,
    );

    reply.status(STATUS_CODES.SUCCESS).send(await this.transactionService.get(request));
  }
}
