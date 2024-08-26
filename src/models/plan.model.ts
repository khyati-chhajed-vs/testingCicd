/**
 * File: plan.model
 * Author: KHYATI.CHHAJED
 * Date: 12-06-2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const PlanModel = (sequelize: Sequelize) => {
  class Plan extends Model {}

  Plan.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      category_id: {
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
      image_url: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      add_ip: {
        type: DataTypes.STRING(30),
      },
      add_time: {
        type: DataTypes.DATE,
      },
      add_by: {
        type: DataTypes.STRING(100),
      },
      update_ip: {
        type: DataTypes.STRING(10),
      },
      update_time: {
        type: DataTypes.DATE,
      },
      update_by: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'tbl_documents', // Adjust table name as per your database table name
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );
  return Plan;
};
