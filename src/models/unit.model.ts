/**
 * File: unit.model
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 11-06-2024
 * Description: Sequelize model for tbl_units
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const UnitModel = (sequelize: Sequelize) => {
  class Unit extends Model {}

  Unit.init(
    {
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      section_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      unit_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      unit_comments: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      url_key: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      is_rental_enabled: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      smoobu_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: '',
      },
      smoobu_id_old: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: '',
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: 'ACTIVE',
      },
      add_ip: {
        type: DataTypes.STRING(30),
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      add_by: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: '',
      },
      update_ip: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      update_by: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
      },
      pest_control_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_units',
      timestamps: false,
      underscored: false,
    },
  );
  return Unit;
};
