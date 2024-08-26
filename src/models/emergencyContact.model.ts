/**
 * File: emergencyContact.model
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 30-05-2024
 * Description: Sequelize model for tbl_emergency
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const EmergencyContactModel = (sequelize: Sequelize) => {
  class Emergency extends Model {}

  Emergency.init(
    {
      emergency_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emergency_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emergency_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      add_ip: {
        type: DataTypes.STRING,
      },
      add_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      update_ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      update_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      meta_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      meta_keyword: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      meta_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_emergency',
      paranoid: true,
      timestamps: false,
    },
  );
  return Emergency;
};
