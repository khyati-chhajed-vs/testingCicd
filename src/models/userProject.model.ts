/**
 * File: userProject.model
 * Author: AKSHIKA.CHOUDHARY
 * Date: 12-05-2024
 */
import { DataTypes, Model, Sequelize } from 'sequelize';
import { SERVICE_REQUEST_STATUS } from '../common/constants';

export const UserProjectModel = (sequelize: Sequelize) => {
  class UserProject extends Model {}

  UserProject.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      project_unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      project_unit: {
        type: DataTypes.STRING(255),
      },
      survey_postpone_count: {
        type: DataTypes.INTEGER,
      },
      furnish_property_status: {
        defaultValue: 'NOT_STARTED',
        type: DataTypes.ENUM(...Object.values(SERVICE_REQUEST_STATUS)),
        allowNull: false,
      },
      is_welcome_video_watched: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      rental_request_status: {
        defaultValue: 'NOT_STARTED',
        type: DataTypes.ENUM(...Object.values(SERVICE_REQUEST_STATUS)),
        allowNull: false,
      },
      property_update_notification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      device_id: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_user_projects',
      paranoid: true,
      timestamps: false,
    },
  );
  return UserProject;
};
