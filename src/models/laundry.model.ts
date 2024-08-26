/**
 * File: laundry.model
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 31-05-2024
 * Description: Sequelize model for tbl_laundry
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

import { APPLICATION_NAME, REQUEST_STATUS, STATUS } from '../common/constants';

export const LaundryModel = (sequelize: Sequelize) => {
  class LaundryRequest extends Model {}

  LaundryRequest.init(
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
      caretaker_id: {
        type: DataTypes.BIGINT,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      request_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      request_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      comments: {
        type: DataTypes.STRING,
      },
      admin_comments: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: STATUS.ACTIVE,
      },
      request_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: REQUEST_STATUS.NOT_STARTED,
      },
      add_ip: {
        type: DataTypes.STRING,
      },
      add_time: {
        type: DataTypes.DATE,
      },
      add_by: {
        type: DataTypes.STRING,
        defaultValue: APPLICATION_NAME,
      },
      update_ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
      },
      update_by: {
        type: DataTypes.STRING,
      },
      deleted_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reassign_estate_manager_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      reassign_estate_manager_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      re_assign_to: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      re_assign_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tat_twenty_four: {
        type: DataTypes.BOOLEAN,
      },
      tat_forty_eight: {
        type: DataTypes.BOOLEAN,
      },
      extend_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      view_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_laundry_requests',
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );
  return LaundryRequest;
};
