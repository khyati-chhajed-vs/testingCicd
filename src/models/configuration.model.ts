/**
 * File: configuration.model
 * Author: AKSHIKA.CHOUDHARY
 * Date: 07-05-2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const ConfigurationModel = (sequelize: Sequelize) => {
  class Configuration extends Model {}

  Configuration.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tbl_configuration',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );
  return Configuration;
};
