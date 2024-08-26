/**
 * File: feedback.model
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 11-06-2024
 * Description: Sequelize model for tbl_feedback
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const FeedbackModel = (sequelize: Sequelize) => {
  class Feedback extends Model {}

  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'tbl_feedback',
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );
  return Feedback;
};
