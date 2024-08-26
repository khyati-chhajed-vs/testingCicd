/**
 * File: catamaranConfig.model
 * Author: AKSHIKA.CHOUDHARY
 * Date: 11-06-2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const CatamaranConfigModel = (sequelize: Sequelize) => {
  class CatamaranConfig extends Model {}

  CatamaranConfig.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      no_of_pax: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      questions: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      disclaimer: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      is_request_generation_flow: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      terms_and_conditions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prior_booking_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tbl_catamaran_config',
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );
  return CatamaranConfig;
};
