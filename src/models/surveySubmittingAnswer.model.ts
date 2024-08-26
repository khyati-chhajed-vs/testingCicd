/**
 * File: surveySubmittingAnswer.model
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 09-06-2024
 * Description:Sequelize model for table tbl_feedback_submitting_answer
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const SurveySubmittingAnswerModel = (sequelize: Sequelize) => {
  class SurveySubmittingAnswer extends Model {}

  SurveySubmittingAnswer.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      submitting_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      question_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING(2000),
        allowNull: true,
      },
      answer_reasons: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'ACTIVE',
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_feedback_submitting_answer',
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );
  return SurveySubmittingAnswer;
};
