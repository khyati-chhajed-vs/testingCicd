/**
 * File: base.service
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: base service class
 */
import { FastifyInstanceToken, FastifyReplyToken, FastifyRequestToken, Inject } from 'fastify-decorators';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export class BaseService {
  @Inject(FastifyInstanceToken)
  fastifyInstance!: FastifyInstance;

  @Inject(FastifyRequestToken)
  request!: FastifyRequest;

  @Inject(FastifyReplyToken)
  reply!: FastifyReply;
}
