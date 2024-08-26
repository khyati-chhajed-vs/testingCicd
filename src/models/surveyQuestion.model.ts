/**
 * File: surveyQuestion.model
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description: Sequelize model for table tbl_feedback_questions
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const SurveyQuestionModel = (sequelize: Sequelize) => {
  class SurveyQuestion extends Model {}

  SurveyQuestion.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      project_status: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'COMPLETED',
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'ACTIVE',
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      add_ip: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      add_by: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      update_ip: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      update_by: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_feedback_questions',
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );
  return SurveyQuestion;
};
