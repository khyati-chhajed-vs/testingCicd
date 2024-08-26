/**
 * File: transaction.service
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 22-07-2024
 * Description: service to handle bussiness logic related to payment transactions
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { TransactionDAO } from '../dao';
import { logger } from '../common/services/logger.service';
import { createHash } from 'crypto';
import { FastifyRequest } from 'fastify';
import { createTransactionRequest, GetTransactionRequest } from '../types/v1';
import { secretsManager } from '../common/services/secretsManager.service';
import { SECRETNAMES } from '../common/constants/secret-manager.constant';

@Service()
export class TransactionService extends BaseService {
  @Inject(TransactionDAO)
  private transactionDAO!: TransactionDAO;

  /**
   * Method to create payment transaction
   * @param reqBody
   * @param user_id
   * @returns
   */
  async createTransaction(request: FastifyRequest<createTransactionRequest>) {
    const { amount } = request.body;
    const { demand_id } = request.params;
    try {
      logger.info(
        `TransactionService -> createTransaction : invoking service routine to create payment transaction for demand_id ${demand_id} request data : ${JSON.stringify(request.body)}`,
      );

      const transaction_data = await this.transactionDAO.createTransaction({
        amount,
        demand_id,
      });

      return { transaction_id: transaction_data.id };
    } catch (error) {
      logger.error(
        `TransactionService -> createTransaction  :: Request failed to create payment transaction request. project_id : ${request.params.project_id}, unit_id : ${request.params.unit_id} ,demand_id :${request.params.demand_id}`,
        error,
      );

      throw error;
    }
  }

  /**
   * Method to generate hash for transaction
   * @param hash_string_without_salt
   * @returns
   */
  async generateHash(hash_string_without_salt: string) {
    logger.debug(
      `TransactionService->generateHash : invoking service routine for generating hash for payment transaction `,
    );

    const hash_string =
      hash_string_without_salt +
      (secretsManager?.getSecret[SECRETNAMES.vianaarServer]?.MERCHANT_SALT ?? process.env?.MERCHANT_SALT ?? '');

    return { hash: createHash('sha512').update(hash_string).digest('hex') };
  }

  /**
   * Method to get transaction details of a demand_id of a project_id and unit_id
   * @param request
   */
  async get(request: FastifyRequest<GetTransactionRequest>) {
    const { project_id, unit_id, demand_id } = request.params;
    logger.debug(`TransactionService -> get: fetch details of all transaction of a  project_id: ${project_id}`);
    try {
      const transaction_details = await this.transactionDAO.get(project_id, unit_id, demand_id);

      return transaction_details ?? [];
    } catch (error) {
      logger.error(
        `TransactionService -> get : Failed to get transaction details for project_id :${project_id}`,
        error,
      );

      throw error;
    }
  }
}
