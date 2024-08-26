/**
 * File: notification.model
 * Author: AKSHIKA CHOUDHARY
 * Date:  18-07-2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const NotificationModel = (sequelize: Sequelize) => {
  class Notification extends Model {}

  Notification.init(
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
      notification_heading: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      notification_comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_name: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
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
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      notification_added_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      caretaker_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_notification',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );
  return Notification;
};
