/**
 * File: serviceRequest.model
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 18-06-2024
 * Description: Sequelize model for tbl_service_request
 */

import { REQUEST_STATUS } from '../common/constants';

import { DataTypes, Model, Sequelize } from 'sequelize';
export const ServiceRequestModel = (sequelize: Sequelize) => {
  class ServiceRequest extends Model {}

  ServiceRequest.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      caretaker_id: {
        type: DataTypes.BIGINT,
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      request_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      request_status: {
        type: DataTypes.ENUM(...Object.values(REQUEST_STATUS)),
        allowNull: false,
        defaultValue: REQUEST_STATUS.NOT_STARTED,
      },
      add_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tbl_service_requests',
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return ServiceRequest;
};
