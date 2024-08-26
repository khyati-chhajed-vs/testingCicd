/**
 * File: surveySubmitting.model
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description: Sequelize model for table tbl_feedback_submitting
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const SurveySubmittingModel = (sequelize: Sequelize) => {
  class SurveySubmitting extends Model {}

  SurveySubmitting.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      user_full_name: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      user_email: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      project_name: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      unit_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      submitting_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: 'ACTIVE',
      },
      add_ip: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      add_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
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
      deleted_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: '',
      },
    },
    {
      sequelize,
      tableName: 'tbl_feedback_submitting',
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );
  return SurveySubmitting;
};
