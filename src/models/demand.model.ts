/**
 * File: demand.model
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 19-07-2024
 * Description: sequelize Model for tbl_demands
 */

import { DataTypes, Model, Sequelize } from 'sequelize';
import { DEMAND_PAYMENT_STATUS, DEMAND_TYPE } from '../common/constants';

export const DemandModel = (sequelize: Sequelize) => {
  class Demand extends Model {}
  Demand.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      invoice_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      amount_to_be_paid: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      remark: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      demand_type: {
        type: DataTypes.ENUM(...Object.values(DEMAND_TYPE)),
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM(...Object.values(DEMAND_PAYMENT_STATUS)),
        allowNull: false,
      },
      payment_due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_interest_waived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      add_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      erp_response_dump: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_demands',
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return Demand;
};
