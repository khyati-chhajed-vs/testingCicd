/**
 * File: transaction.model
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 22-07-2024
 * Description:sequelize model of table tbl_transaction
 */

import { DataTypes, Model, Sequelize } from 'sequelize';
import { PAYMENT_MODE, TRANSACTION_PAYMENT_STATUS } from '../common/constants';

export const TransactionModel = (sequelize: Sequelize) => {
  class Transaction extends Model {}
  Transaction.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      demand_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      invoice_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      recipet_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      instrument_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instrument: {
        type: DataTypes.STRING,
        defaultValue: PAYMENT_MODE.ONLINE,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      is_advance_adjusted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      advance_adjusted_amount: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
      },
      payment_mode: {
        type: DataTypes.ENUM(...Object.values(PAYMENT_MODE)),
        defaultValue: PAYMENT_MODE.ONLINE,
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM(...Object.values(TRANSACTION_PAYMENT_STATUS)),
        defaultValue: TRANSACTION_PAYMENT_STATUS.PENDING,
        allowNull: false,
      },
      pg_response_dump: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      erp_response_dump: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_transaction',
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return Transaction;
};
