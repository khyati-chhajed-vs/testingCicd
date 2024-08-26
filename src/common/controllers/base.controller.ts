import { FastifyInstance, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import {
  BadRequestError,
  BadTokenError,
  NotFoundError,
  UnAuthorisedError,
  DataValidationError,
  ServerError,
  AlreadyExistError,
  ThresholdExceededError,
} from '../exceptions/errors';
import { FastifyInstanceToken, Inject, ErrorHandler } from 'fastify-decorators';
import { logger } from '../services/logger.service';
import { ERROR_CODES, STATUS_CODES } from '../constants/common.constant';

/*
    Resposibilities
    1. All error handling
    2. CORS
*/
export abstract class BaseController {
  @Inject(FastifyInstanceToken) fastifyInstance!: FastifyInstance;

  // Errors
  @ErrorHandler(BadTokenError)
  handleTokenNotFound(error: BadTokenError, request: FastifyRequest, reply: FastifyReply) {
    reply.status(STATUS_CODES.FORBIDDEN).send({ message: 'Not Authorized', code: error.code });
  }

  // Errors
  @ErrorHandler(UnAuthorisedError)
  handleUnAuthorised(error: UnAuthorisedError, request: FastifyRequest, reply: FastifyReply) {
    reply.status(STATUS_CODES.UNAUTHORISED).send({ message: error.message, code: error.code });
  }

  @ErrorHandler(NotFoundError)
  handleNotFoundError(error: NotFoundError, request: FastifyRequest, reply: FastifyReply) {
    reply.status(STATUS_CODES.NOT_FOUND).send({ message: error.message, code: error.code });
  }

  @ErrorHandler(DataValidationError)
  handleDataValidationError(error: DataValidationError, request: FastifyRequest, reply: FastifyReply) {
    reply.status(STATUS_CODES.BAD_REQUEST).send({
      message: error.message,
      code: error.code || ERROR_CODES.DATA_VALIDATION_FAILED,
    });
  }

  @ErrorHandler(BadRequestError)
  handleBadRequestError(error: BadRequestError, request: FastifyRequest, reply: FastifyReply) {
    reply.status(STATUS_CODES.BAD_REQUEST).send({ message: error.message, code: error.code });
  }

  @ErrorHandler(ServerError)
  handleServerError(error: BadRequestError, request: FastifyRequest, reply: FastifyReply) {
    reply.status(STATUS_CODES.SERVER_ERROR).send({ message: error.message, code: error.code });
  }

  @ErrorHandler(AlreadyExistError)
  handleAlreadyExistError(error: AlreadyExistError, request: FastifyRequest, reply: FastifyReply) {
    reply.status(STATUS_CODES.CONFLICT).send({
      message: error.message,
      code: error.code,
    });
  }

  @ErrorHandler(ThresholdExceededError)
  handleThresholdExceededError(error: ThresholdExceededError, request: FastifyRequest, reply: FastifyReply) {
    reply.status(STATUS_CODES.BAD_REQUEST).send({
      message: error.message,
      code: error.code,
    });
  }

  // Unhandeled exception
  @ErrorHandler()
  generalErrorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    logger.error(`General Error: error ${JSON.stringify(error)}`);
    if (error.validation) {
      this.handleDataValidationError(error, request, reply);
    }

    reply.status(STATUS_CODES.SERVER_ERROR).send({ message: error.message, code: ERROR_CODES.SERVER_ERROR });
  }
}
