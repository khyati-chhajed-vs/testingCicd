/**
 * File: base.dao
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: DAO layer methods
 */

import { FastifyInstance } from 'fastify';
import { FastifyInstanceToken, Inject, Service } from 'fastify-decorators';
import { ModelDefined, Op, TransactionOptions, Transaction, FindAttributeOptions } from 'sequelize';

import { SequelizeClient } from '../clients/sequelize.client';
import { logger } from './services/logger.service';

import { convertToCamelCase } from './utils/operations';
import { QueryTypes } from './constants/common.constant';
interface Query {
  query: string;
  bindParams?: any[];
}

@Service()
export abstract class BaseDAO {
  @Inject(FastifyInstanceToken) fastifyInstance!: FastifyInstance;

  /**
   * generic function to create data for the model reference provided
   * @param model
   * @param data
   * @param options
   * @returns
   */
  async create(model: ModelDefined<any, any>, data: any, transaction?: Transaction): Promise<any> {
    const result = await model.create(data, {
      ...(transaction && { transaction }),
    });
    return result;
  }

  /**
   * Method to update by id
   * @param model
   * @param id
   * @param data
   * @returns
   */
  async updateById(model: ModelDefined<any, any>, id: number, data: any, transaction?: Transaction) {
    return model.update({ ...data }, { where: { id }, transaction });
  }

  /**
   * Method to delete by id
   * @param model
   * @param id
   * @param data
   * @returns
   */
  async delete(model: ModelDefined<any, any>, id: number, transaction?: Transaction) {
    logger.info(`Deleting in table ${model.name} for id : ${id}`);
    return model.destroy({ where: { id }, transaction });
  }

  /**
   * generic function to upsert data for the model reference
   * @param model
   * @param data
   * @param options
   * @returns
   */
  async upsert(model: ModelDefined<any, any>, data: any, options?: TransactionOptions) {
    return model.upsert({ ...data }, options);
  }

  /**
   * Method to check Fields And Update If they are Changed
   * @param fieldsToCheck
   * @param fieldsToCheckAgainst
   * @param recordId
   * @param modelRef
   * @returns
   */
  async checkFieldsAndUpdateIfChanged(
    fieldsToCheck: Object,
    fieldsToCheckAgainst: Object,
    recordId: number,
    modelRef: ModelDefined<any, any>,
  ) {
    logger.info(
      `BaseDAO -> checkFieldsAndUpdateIfChanged: to check if fields : ${JSON.stringify(
        fieldsToCheck,
      )} are changed from ${JSON.stringify(fieldsToCheckAgainst)} : ${JSON.stringify(fieldsToCheck)}`,
    );
    const updatedFields = {};
    let hasAnyFieldChanged = false;

    for (const field in fieldsToCheck) {
      if (field in fieldsToCheckAgainst && fieldsToCheckAgainst[field] !== fieldsToCheck[field]) {
        const camelCaseField = convertToCamelCase(field);
        logger.info('BaseDAO -> checkFieldsAndUpdateIfChanged: camelcase fields', camelCaseField);
        updatedFields[camelCaseField] = fieldsToCheck[field];
        hasAnyFieldChanged = true;
      }
    }
    if (!hasAnyFieldChanged) {
      logger.info(
        `BaseDAO -> checkFieldsAndUpdateIfChanged: updated fields : none
        )}`,
      );
      return {};
    }
    logger.info(`BaseDAO -> checkFieldsAndUpdateIfChanged: fields to update : ${JSON.stringify(updatedFields)}`);
    await modelRef.update(updatedFields, {
      where: {
        id: recordId,
      },
    });
    logger.info(
      `BaseDAO -> checkFieldsAndUpdateIfChanged: fields updated successfuly : ${JSON.stringify(updatedFields)}`,
    );
    return updatedFields;
  }

  /**
   * Method to execute Query With Param
   * @param sql
   * @param type
   * @returns
   */
  async executeQueryWithParam(sql: Query, type?: QueryTypes): Promise<any> {
    let options: { replacements?: any[]; type: QueryTypes } = {
      type: type ?? QueryTypes.SELECT,
    };
    options = sql.bindParams ? { ...options, replacements: sql.bindParams } : options;
    return SequelizeClient.sequelize.query(sql.query, options);
  }

  /**
   * Get all records where date deleted is null
   * @param model
   * @param ids
   * @returns
   */
  async findByIdsAndDateDeletedIsNull(model: ModelDefined<any, any>, ids: any) {
    return model.findAll({
      where: {
        id: ids,
        deletedAt: {
          [Op.is]: null,
        },
      },
    });
  }

  /**
   * Method to update a model row by id
   * @param model
   * @param data
   * @param id
   * @returns
   */
  async update(model: ModelDefined<any, any>, data: any, id: number, transaction?: Transaction) {
    logger.info(`BaseDAO -> update :: updating the details on table ${model.name} with row id = ${id} `);
    return model.update(data, { where: { id: id }, transaction });
  }

  /**
   * Method to find model element by id
   * @param model
   * @param id
   * @returns
   */
  async findById(model: ModelDefined<any, any>, id: number) {
    this.fastifyInstance.log.info(`BaseDAO -> update :: updating in table ${model} , id = ${id} `);
    return model.findByPk(id);
  }

  /**
   * Method to find one result that matches a condition
   * @param model
   * @param condition
   * @param attributes
   * @returns
   */
  async findOne(model: ModelDefined<any, any>, condition: { [k: string]: any }, attributes?: string[]): Promise<any> {
    this.fastifyInstance.log.info(condition);
    const result = await model.findOne({
      where: condition,
      ...(attributes && { attributes }),
      raw: true,
    });
    this.fastifyInstance.log.info(result);
    return result;
  }

  /**
   * Method to get transaction object
   * @returns Transaction obj
   */
  async getTransaction() {
    return SequelizeClient.sequelize.transaction();
  }

  /*
   * Method to find all result that matches a condition
   * @param model
   * @param condition
   * @param attributes
   * @returns
   */
  async findAll(
    model: ModelDefined<any, any>,
    condition: { [k: string]: any },
    attributes?: FindAttributeOptions,
    paginationOptions?: { limit: number; offset: number } | undefined,
  ): Promise<any> {
    return model.findAll({
      where: { ...condition },
      ...(attributes && { attributes }),
      ...paginationOptions,
      paranoid: true,
      raw: true,
    });
  }

  /**
   * Method toh bulk update by ids
   * @param model
   * @param data
   * @param ids
   * @param transaction
   * @returns
   */
  async bulkUpdate(model: ModelDefined<any, any>, data: any, ids: number[], transaction?: Transaction) {
    this.fastifyInstance.log.info(`BaseDAO -> update :: updating in table ${model} with data = ${data}, ids = ${ids} `);
    const result = await model.update(data, {
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });
    return result;
  }

  /**
   * Method to soft delete record in bulk for the given table
   * @param model
   * @param data
   * @param ids
   * @param transaction
   * @returns
   */
  async bulkDelete(model: ModelDefined<any, any>, ids: number[], transaction?: Transaction) {
    this.fastifyInstance.log.info(`BaseDAO -> bulkDelete :: deleting in table ${model.name} where ids = ${ids} `);
    const result = await model.destroy({
      where: { id: ids },
      transaction: transaction,
    });
    return result;
  }

  /**
   * Method to soft delete record in bulk for the given table
   * @param model
   * @param data
   * @param ids
   * @param transaction
   * @returns
   */
  async bulkDeleteByConditions(model: ModelDefined<any, any>, condition: any[], transaction?: Transaction) {
    this.fastifyInstance.log.info(
      `BaseDAO -> bulkDelete :: deleting in table ${model.name} by conditions: ${condition} `,
    );
    const result = await model.destroy({
      where: { [Op.or]: condition },
      transaction: transaction,
    });
    return result;
  }

  /**
   * Method to insert record in bulk for the given table
   * @param model
   * @param data
   * @returns
   */
  async bulkCreate(model: ModelDefined<any, any>, data: any, transaction?: Transaction, updateOnDuplicate?: string[]) {
    this.fastifyInstance.log.info(
      `BaseDAO -> create :: bulk create in table ${model.name} with data = ${JSON.stringify(data, null, 2)}`,
    );
    const result = await model.bulkCreate(data, {
      updateOnDuplicate,
      ...(transaction && { transaction }),
    });
    return result;
  }

  /**
   * Method to soft delete a record for the given table
   * @param model
   * @param data
   * @param ids
   * @param transaction
   * @returns
   */
  async destroy(model: ModelDefined<any, any>, whereCondition: any, transaction?: Transaction) {
    this.fastifyInstance.log.info(`BaseDAO -> update :: Destroy in table ${model}`);
    const result = await model.destroy({
      where: whereCondition,
      ...(transaction && { transaction }),
    });
    return result;
  }

  /**
   * Method to get records excluding those with the given IDs
   * @param model
   * @param primaryKeyField
   * @param excludedIds
   * @param orConditions
   * @param andConditions
   * @returns
   */
  async findAllExcept(
    model: ModelDefined<any, any>,
    primaryKeyField: string,
    excludedIds: number[],
    orConditions?: any,
    andConditions?: any,
  ) {
    const whereCondition = {
      [Op.and]: [
        { [primaryKeyField]: { [Op.notIn]: excludedIds } }, //excluding  primary key ids
        orConditions && { [Op.or]: orConditions },
        andConditions,
      ],
    };

    return model.findAll({
      where: whereCondition,
      order: ['id'],
    });
  }
}
