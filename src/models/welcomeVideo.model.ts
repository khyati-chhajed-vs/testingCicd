/**
 * File: welcomeVideo.model.js
 * Author: AKSHIKA.CHOUDHARY
 * Date: 5-05-2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const WelcomeVideoModel = (sequelize: Sequelize) => {
  class WelcomeVideo extends Model {}

  WelcomeVideo.init(
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
      project_type: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      file: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'ACTIVE',
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
      tableName: 'tbl_welcome_videos',
      timestamps: false,
      underscored: true,
    },
  );
  return WelcomeVideo;
};
