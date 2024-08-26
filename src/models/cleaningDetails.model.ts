/**
 * File: cleaningDetails.model
 * Author: manoj.fulara@vectoscalar.com
 * Date: 31-05-2024
 * Description: Sequelize model for tbl_appt_reg_data
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const CleaningModel = (sequelize: Sequelize) => {
  class Cleaning extends Model {}
  Cleaning.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      section_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      project_id_old: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      section_id_old: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      unit_id_old: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      heading_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      sub_heading_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      cleaning_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entry_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      entry_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      flag: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      staff_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      add_ip: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      add_by: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      update_ip: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      update_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      next_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_appt_reg_data',
      timestamps: false,
    },
  );

  return Cleaning;
};
